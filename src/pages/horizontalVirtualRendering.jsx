import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Layout from '../components/Layout';
import '../styles/horizontalVirtualRendering.css';

const TOTAL_ITEMS = 100;
const ITEM_WIDTH = 300;
const ITEM_SIZE = 260;
const ITEM_OFFSET = 20;
const INITIAL_ITEM = 50;
const BUFFER = 1;
const STEP = 250;

function getScrollLeftToCenterItem(itemNumber, viewportWidth) {
    const index = itemNumber - 1;
    const itemCenter = index * ITEM_WIDTH + ITEM_OFFSET + ITEM_SIZE / 2;
    return Math.max(0, itemCenter - viewportWidth / 2);
}

function getColor(index) {
    const hue = (index * 47) % 360;
    return `hsl(${hue}, 70%, 50%)`;
}

function HorizontalVirtualRendering() {
    const viewportRef = useRef(null);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [viewportWidth, setViewportWidth] = useState(0);

    const updateScroll = useCallback(() => {
        if (viewportRef.current) {
            setScrollLeft(viewportRef.current.scrollLeft);
            setViewportWidth(viewportRef.current.clientWidth);
        }
    }, []);

    useEffect(() => {
        const viewport = viewportRef.current;
        if (!viewport) {
            return undefined;
        }

        const centerInitialItem = () => {
            const width = viewport.clientWidth;
            if (width > 0) {
                viewport.scrollLeft = getScrollLeftToCenterItem(INITIAL_ITEM, width);
            }
        };

        centerInitialItem();
        updateScroll();
        viewport.addEventListener('scroll', updateScroll);
        window.addEventListener('resize', updateScroll);

        return () => {
            viewport.removeEventListener('scroll', updateScroll);
            window.removeEventListener('resize', updateScroll);
        };
    }, [updateScroll]);

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

    const startIndex = Math.max(0, Math.floor(scrollLeft / ITEM_WIDTH) - BUFFER);
    const endIndex = Math.min(
        TOTAL_ITEMS - 1,
        Math.ceil((scrollLeft + viewportWidth) / ITEM_WIDTH) + BUFFER
    );

    const visibleIndices = [];
    for (let index = startIndex; index <= endIndex; index += 1) {
        visibleIndices.push(index);
    }

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
                                    aria-label="Horizontal virtual rendering viewport"
                                >
                                    <div
                                        id="hvr-spacer"
                                        className="hvr-spacer"
                                        style={{ width: `${TOTAL_ITEMS * ITEM_WIDTH}px` }}
                                    >
                                        {visibleIndices.map((index) => (
                                            <div
                                                key={index}
                                                id={`hvr-item-${index + 1}`}
                                                className="hvr-item"
                                                style={{
                                                    left: `${index * ITEM_WIDTH + ITEM_OFFSET}px`,
                                                    background: getColor(index),
                                                }}
                                            >
                                                #{index + 1}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="hvr-panel-footer" id="hvr-footer">
                                    {TOTAL_ITEMS.toLocaleString()} items total — only visible items are rendered in the DOM
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
