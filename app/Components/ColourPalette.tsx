import { position } from "html2canvas/dist/types/css/property-descriptors/position";
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
    z-index: 1000;
`;

const StyledInputContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 10px;
    z-index: 1000;
`;

const StyledInput = styled.input`
    margin-right: 10px;
    border-radius: 1rem;
    padding: 0.5rem;
`;

const ApplyButton = styled.button`
    padding: 0.5rem;
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
`;

const ColourPalette = (props: {
    color: string;
    setColor: Dispatch<SetStateAction<string>>;
    handleColourChange: () => void;
}) => {
    // const [inputColor, setInputColor] = useState<string>(props.color);

    const handleApplyColor = () => {
        props.handleColourChange();
    };

    return (
        // @ts-ignore
        <Draggable handle="span">
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
                        value={props.color}
                        onChange={(e: any) => props.setColor(e.target.value)}
                    />
                    <ApplyButton onClick={handleApplyColor}>Apply</ApplyButton>
                </StyledInputContainer>
                <span
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                    }}
                ></span>
            </StyledColourPalette>
        </Draggable>
    );
};

export default ColourPalette;
