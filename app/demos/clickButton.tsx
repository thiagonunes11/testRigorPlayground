

import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { useState } from "react";
import Layout from "../components/Layout";

export default function ClickButton() {
    const [revealed, setRevealed] = useState(false);

    return (
        <Layout
            title="Button Click Demo"
            description="Click the button to reveal hidden content."
        >
            <Box className="border p-4 rounded-lg w-full">
                <Button
                    onPress={() => setRevealed(true)}
                    className="mx-auto block text-lg font-medium bg-blue-400 text-white rounded hover:bg-blue-500 transition"
                >
                    <ButtonText>Click to Reveal</ButtonText>
                </Button>
                {revealed && (
                    <p className="text-center text-gray-500 mt-6">
                        Congratulations! You've successfully revealed the hidden content.
                    </p>
                )}
            </Box>
        </Layout>
    );
}
