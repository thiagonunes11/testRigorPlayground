import { RelativePathString, useRouter } from "expo-router";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { Box } from '@/components/ui/box';
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";
import { Text } from '@/components/ui/text';

interface DemoBlockProps {
  icon: string;
  title: string;
  description: string;
  page: string;
}

const DemoBlock: React.FC<DemoBlockProps> = ({
  icon,
  title,
  description,
  page,
}) => {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  const handlePress = () => {
    const fullUrl: RelativePathString = `/demos/${page}` as RelativePathString;
    router.push(fullUrl);
  };

  return (
    <Pressable
      onPress={handlePress}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
    >
      <Box
        className={`flex flex-col w-full border border-gray-200 rounded-lg p-4 transition-all py-5 px-4
          ${hovered ? "bg-purple-50 shadow-lg" : "bg-white shadow"}
        `}
        style={{
          boxShadow: hovered
        ? "0 4px 16px rgba(66,133,244,0.2)"
        : "0 1px 4px rgba(0,0,0,0.05)",
          top: hovered ? -4 : 0,
          position: "relative",
        }}
      >
        <Icon name={icon} size={36} color="#4285f4" className="mb-2" />
        <Heading className="mb-2">{title}</Heading>
        <Text className="text-gray-600 mb-2" size="sm">{description}</Text>
      </Box>
    </Pressable>
  );
};

export default DemoBlock;
