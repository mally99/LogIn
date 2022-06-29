
import { useMemo, useState, useEffect } from "react";
import { getFunc } from "../services/httpService";
import { useStore } from "../store";
import Table from "./Table"
import { fixBoolFields } from "../services/helper";
import styled from "styled-components";
const Styles = styled.div`
   padding: 1rem;
`;
const Info = () => {
    const { myStore } = useStore();
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        (async () => {
            const result = await getFunc(myStore.token);
            if (result.status === 201) {
                setData(fixBoolFields(result.data));
            }
            else {
                alert("Something Went Wrong......   :(");
            }
        })();
    }, []);
    const columns = useMemo(
        () => [

            {
                Header: "bugsCount",
                accessor: "bugsCount"
            },
            {
                Header: "durationInDays",
                accessor: "durationInDays"
            },
            {
                Header: "id",
                accessor: "id"
            },
            {
                Header: "madeDadeline",
                accessor: "madeDadeline"
            },
            {
                Header: "name",
                accessor: "name"
            },
            {
                Header: "score",
                accessor: "score"
            }
        ]
        ,
        []
    );

    return (
        <Styles>
            <h2><b>Personal Details</b></h2>
            <h4>name : {myStore.personalDetails?.name}</h4>
            <h4>team : {myStore.personalDetails?.Team}</h4>
            <h4>joined at : {myStore.personalDetails?.joinedAt}</h4>
            <img style={{ height: "100px" }} alt="avatar" src={myStore.personalDetails?.avatar} />
            <Table columns={columns} data={data} />
        </Styles>
    )
};
export default Info;