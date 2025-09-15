import { Grid, GridItem } from '@/components/ui/grid';

import DemoButton from "./components/DemoButton";
import Layout from "./components/Layout";


export default function App() {
    return (
        <Layout
            title="Welcome to testRigor Playground"
            description="Explore our collection of interactive demos designed to help you test various web elements and interactions."
        >

            <Grid className="gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3" _extra={{
                className: ''
            }}>
                <GridItem className="p-6 rounded-md w-full" _extra={{
                    className: ''
                }}>
                    <DemoButton
                        icon="microphone"
                        title="Audio Validation"
                        description="Record and check if the audios match."
                        page="audioValidation"
                    />
                </GridItem>
                <GridItem className="p-6 rounded-md w-full" _extra={{
                    className: ''
                }}>
                    <DemoButton
                        icon="check-circle"
                        title="Button Click"
                        description="Click the button to reveal hidden text."
                        page="clickButton"
                    />
                </GridItem>
            </Grid>
        </Layout>
    );
}