import React, { useState } from "react";

interface InterestTagsProps {
    interests: string[];
    onChange: (interests: string[]) => void;
    readOnly?: boolean;
}

const InterestTags: React.FC<InterestTagsProps> = ({ interests, onChange, readOnly = false }) => {
    const [newTag, setNewTag] = useState<string>("");

    const handleAddTag = () => {
        if (!newTag.trim()) return;

        // Don't add duplicate tags
        const tags = interests ? interests : [];
        if (!tags.includes(newTag.trim())) {
            const updatedTags = [...tags, newTag.trim()];
            onChange(updatedTags);
        }

        setNewTag("");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAddTag();
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        const updatedTags = interests.filter((tag) => tag !== tagToRemove);
        onChange(updatedTags);
    };

    return (
        <div className="space-y-2">
            {!readOnly && (
                <div className="flex">
                    <input type="text" value={newTag} onChange={(e) => setNewTag(e.target.value)} onKeyDown={handleKeyDown} placeholder="Add interest (e.g., Photography)" className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <button type="button" onClick={handleAddTag} className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Add
                    </button>
                </div>
            )}

            <div className="flex flex-wrap gap-2">
                {interests &&
                    interests.map((tag) => (
                        <div key={tag} className={`px-3 py-1 rounded-full text-sm ${readOnly ? "bg-gray-100 text-gray-800" : "bg-blue-100 text-blue-800"} flex items-center`}>
                            {tag}
                            {!readOnly && (
                                <button type="button" onClick={() => handleRemoveTag(tag)} className="ml-2 text-blue-600 hover:text-blue-800 focus:outline-none">
                                    &times;
                                </button>
                            )}
                        </div>
                    ))}

                {interests && interests.length === 0 && <div className="text-gray-500 text-sm italic">No interests added yet</div>}
            </div>
        </div>
    );
};

export default InterestTags;
