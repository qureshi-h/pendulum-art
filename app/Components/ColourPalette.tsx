import { Dispatch, SetStateAction, useState, useRef } from "react";
import { HexColorPicker } from "react-colorful";

import Draggable, { DraggableCore } from "react-draggable";
import styled from "styled-components";

const StyledColourPalette = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: move;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 1rem;
`;

const ColorPickerContainer = styled.div`
    padding-bottom: 1rem;
    border-bottom: 1px solid #000;
`;

const StyledInputContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 10px;
`;

const StyledInput = styled.input`
    margin-right: 10px;
    padding: 5px;
`;

const ApplyButton = styled.button`
    padding: 5px 10px;
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

const ColourPalette = (props: {
    color: string;
    setColor: Dispatch<SetStateAction<string>>;
    handleColourChange: () => void;
}) => {
    const [inputColor, setInputColor] = useState<string>(props.color);

    const handleApplyColor = () => {
        props.handleColourChange();
    };

    return (
        <Draggable>
            <StyledColourPalette>
                <ColorPickerContainer>
                    <HexColorPicker
                        color={props.color}
                        onChange={props.setColor}
                    />
                </ColorPickerContainer>

                <StyledInputContainer>
                    <StyledInput
                        type="text"
                        value={inputColor}
                        onChange={(e: any) => setInputColor(e.target.value)}
                    />
                    <ApplyButton onClick={handleApplyColor}>Apply</ApplyButton>
                </StyledInputContainer>
            </StyledColourPalette>
        </Draggable>
    );
};

export default ColourPalette;
