import React from "react";

interface KeyBinding {
    key: string;
    description: string;
}

const keyBindings: KeyBinding[] = [
    { key: "Space", description: "Pause/Resume" },
    { key: "Key P", description: "Change color" },
    { key: "Key R", description: "Reset" },
    { key: "Key S", description: "Save as JPEG" },
    { key: "Key H", description: "Open/Close Commands Panel" },
    { key: "Arrow Up/Down", description: "Change line width" },
];

const KeyBindings: React.FC = () => {
    return (
        <div className="keyBindingsBox">
            <div className="key-bindings-grid">
                {keyBindings.map((binding) => (
                    <div key={binding.key} className="key-binding">
                        <div className="key">{binding.key}</div>
                        <div className="description">{binding.description}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default KeyBindings;
