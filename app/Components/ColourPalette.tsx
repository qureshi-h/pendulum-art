import { Dispatch, SetStateAction } from "react";
import { HexColorPicker } from "react-colorful";

const ColourPalette = (props: {
    color: string;
    setColor: Dispatch<SetStateAction<string>>;
}) => {
    return (
        <div>
            <HexColorPicker color={props.color} onChange={props.setColor} />
        </div>
    );
};

export default ColourPalette;
