import {useEffect, useState} from "react";

// the json looks something like this:
// "2024/11/26": { "files": ["1.jpeg"], "text": "test"}
// which can then be loaded @ /public-photos/2024/11/26/1.jpeg

type PhotoLedger = {
    [date: string]: DateInfo;
};

type DateInfo = {
    text: string;
    files: string[];
}

export const usePhotosLedger = (): PhotoLedger => {
    const [response, setResponse] = useState<PhotoLedger>({});

    useEffect(() => {
        fetch(`/public-photos/ledger.json`)
            .then(res => res.json())
            .then(setResponse)
    }, []);

    return response;
}
