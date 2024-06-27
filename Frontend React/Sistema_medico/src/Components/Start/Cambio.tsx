import {  useState } from "react";


export default function Cambio({setSelectedValue}:{setSelectedValue:React.Dispatch<React.SetStateAction<boolean>>;}) {
    const [selectedValue, setSelectedValue1] = useState(true);

 
    const handleChange = () => {
        setSelectedValue(!selectedValue);
        setSelectedValue1(!selectedValue);
    };


    return (
        <div className="">
            <div className="mt-3 flex space-x-2 border-[3px] border-purple-400  rounded-xl select-none">
                <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer">
                    <input
                        type="radio"
                        name="radio"
                        value="Medico"
                        className="peer hidden"
                        checked={selectedValue}
                        onChange={handleChange}
                    />
                    <span className={`tracking-widest p-2 rounded-lg transition duration-150 ease-in-out ${selectedValue? 'peer-checked:bg-gradient-to-r peer-checked:from-blueviolet peer-checked:to-violet peer-checked:text-white  bg-dark' : 'text-gray-700'}`}>
                        Medico
                    </span>
                </label>

                <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer">
                    <input
                        type="radio"
                        name="radio"
                        value="Paciente"
                        className="peer hidden"
                        checked={!selectedValue }
                        onChange={handleChange}
                    />
                    <span className={`tracking-widest p-2 rounded-lg transition duration-150 ease-in-out ${!selectedValue ? 'peer-checked:bg-gradient-to-r peer-checked:from-blueviolet peer-checked:to-violet peer-checked:text-white  bg-dark ' : 'text-gray-700'}`}>
                        Paciente
                    </span>
                </label>

            </div>
        </div>
    )
}