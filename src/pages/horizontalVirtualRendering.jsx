import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Layout from '../components/Layout';
import '../styles/horizontalVirtualRendering.css';

const TOTAL_ITEMS = 100;
const BATCH_SIZE = 20;
const ITEM_SIZE = 260;
const ITEM_GAP = 20;
const ITEM_STRIDE = ITEM_SIZE + ITEM_GAP;
const INITIAL_ITEM = 10;
const NEAR_END_PX = 200;
const STEP = 250;

function getColor(index) {
    const hue = (index * 47) % 360;
    return `hsl(${hue}, 70%, 50%)`;
}

function getScrollLeftToCenterItem(itemNumber, viewportWidth) {
    const index = itemNumber - 1;
    const itemCenter = index * ITEM_STRIDE + ITEM_SIZE / 2;
    return Math.max(0, itemCenter - viewportWidth / 2);
}

function getInitialLoadedCount() {
    const batchesToCoverInitial = Math.ceil(INITIAL_ITEM / BATCH_SIZE);
    return Math.min(TOTAL_ITEMS, batchesToCoverInitial * BATCH_SIZE);
}

function HorizontalVirtualRendering() {
    const viewportRef = useRef(null);
    const hasCenteredRef = useRef(false);
    const [loadedCount, setLoadedCount] = useState(getInitialLoadedCount);

    const tryLoadMore = useCallback(() => {
        const viewport = viewportRef.current;
        if (!viewport) {
            return;
        }

        const nearEnd = viewport.scrollLeft + viewport.clientWidth >= viewport.scrollWidth - NEAR_END_PX;

        if (nearEnd) {
            setLoadedCount((current) => {
                if (current >= TOTAL_ITEMS) {
                    return current;
                }

                return Math.min(TOTAL_ITEMS, current + BATCH_SIZE);
            });
        }
    }, []);

    const centerInitialItem = useCallback(() => {
        const viewport = viewportRef.current;
        if (!viewport || hasCenteredRef.current) {
            return;
        }

        const width = viewport.clientWidth;
        if (width > 0) {
            viewport.scrollLeft = getScrollLeftToCenterItem(INITIAL_ITEM, width);
            hasCenteredRef.current = true;
        }
    }, []);

    useEffect(() => {
        const viewport = viewportRef.current;
        if (!viewport) {
            return undefined;
        }

        const handleScroll = () => {
            tryLoadMore();
        };

        viewport.addEventListener('scroll', handleScroll);

        return () => {
            viewport.removeEventListener('scroll', handleScroll);
        };
    }, [tryLoadMore]);

    useEffect(() => {
        if (loadedCount >= INITIAL_ITEM) {
            centerInitialItem();
        }
    }, [loadedCount, centerInitialItem]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            const viewport = viewportRef.current;
            if (!viewport) {
                return;
            }

            if (event.key === 'ArrowRight') {
                event.preventDefault();
                viewport.scrollLeft += STEP;
            }

            if (event.key === 'ArrowLeft') {
                event.preventDefault();
                viewport.scrollLeft -= STEP;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const items = Array.from({ length: loadedCount }, (_, index) => index + 1);

    return (
        <Layout
            title="Horizontal Virtual Rendering"
            description="Use Arrow Left and Arrow Right keys to scroll through virtual items horizontally."
        >
            <Container className="mt-4">
                <Row className="justify-content-center">
                    <Col xs={12} lg={10}>
                        <div className="hvr-wrapper">
                            <div className="hvr-panel" id="hvr-panel">
                                <div
                                    id="hvr-viewport"
                                    className="hvr-viewport"
                                    ref={viewportRef}
                                    tabIndex={0}
                                    aria-label="Horizontal batch-load scroll viewport"
                                >
                                    <div id="hvr-track" className="hvr-track">
                                        {items.map((number) => (
                                            <div
                                                key={number}
                                                id={`hvr-item-${number}`}
                                                className="hvr-item"
                                                style={{ background: getColor(number - 1) }}
                                            >
                                                #{number}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="hvr-panel-footer" id="hvr-footer">
                                    {loadedCount.toLocaleString()} of {TOTAL_ITEMS.toLocaleString()} items loaded in the DOM — scroll right to batch-load more
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}

export default HorizontalVirtualRendering;
