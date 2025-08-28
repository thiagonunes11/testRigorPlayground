

import { Box } from "@/components/ui/box/index.web";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Layout from "../components/Layout";

export default function ClickButton() {
    const [revealed, setRevealed] = useState(false);

    return (
        <Layout
            title="Button Click Demo"
            description="Click the button to reveal hidden content."
        >
            <Box className="border p-4 rounded-lg ">
                <Button
                    onPress={() => setRevealed(true)}
                    className="mx-auto block text-lg font-medium bg-blue-400 text-white rounded hover:bg-teal-400 transition"
                >
                    Click to Reveal
                </Button>
                {revealed && (
                    <p className="text-center text-gray-500 mt-6">
                        Congratulations! You've successfully revealed the hidden content.
                    </p>
                )}
            </Box>
        </Layout>  );
}
