
import { Grid, GridItem } from '@/components/ui/grid';

import DemoButton from "./components/DemoButton";
import Layout from "./components/Layout";


export default function App() {
    return (
        <Layout
            title="Welcome to testRigor Playground"
            description="Explore our collection of interactive demos designed to help you test various web elements and interactions."
        >

            <Grid className="gap-4" _extra={{ className: 'grid-cols-10' }}>
                <GridItem
                    className="p-6 rounded-md"
                    _extra={{ className: 'col-span-3' }}
                >
                    <DemoButton icon="microphone" title="Audio Validation" description="Record and check if the audios match." />
                </GridItem>
                <GridItem
                    className="p-6 rounded-md"
                    _extra={{ className: 'col-span-3' }}
                >
                    <DemoButton icon="check-circle" title="Button Click" description="Click the button to reveal hidden text." />
                </GridItem>
            </Grid>
        </Layout>
    );
}
