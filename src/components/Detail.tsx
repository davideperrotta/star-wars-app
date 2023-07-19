import { Button, ButtonGroup, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useActionData, useNavigate, useParams } from "react-router-dom";
import Planet from '../types/planet';
import People from '../types/people';
import Vehicle from '../types/vehicle';
import Specie from '../types/specie';
import Starship from '../types/starship';
import Film from '../types/film';
import TableSW from './Table/Table';
import styles from './Header/Header.module.scss';
import appStyles from '../App.module.scss';
import { PageLabels } from '../types/categories';

function Detail () {

    const [detailContent, setDetailContent] = useState<Specie[] | Planet[] | People[] | Vehicle[] | Starship[] | Film[]>();
    const [rowLimit, setRowLimit] = useState<number>(7);
    const { type, id } = useParams();
    const navigate = useNavigate();

    const actionData = useActionData();

    useEffect(() => {
        fetchData();
    },[actionData]);

    const fetchData = async () => {
        let response: any = [];
        if (actionData) {
            response = actionData;
        }
        setDetailContent([response]);
        return [response];
    };

    useEffect(() => {
        if (detailContent && detailContent.length > 0) {
            setRowLimit(Object.keys(detailContent[0]).length);
        }
    }, [detailContent])

    return(
        <>
            <header className={styles.header}>
                {detailContent && (
                    <Typography variant="h4" component="h1">
                        {PageLabels.DetailsHeading} {Object.values(detailContent[0])[0]}
                    </Typography>
                )}
                <ButtonGroup variant="outlined" aria-label="outlined button group">
                    <Button onClick={() => {navigate(`/${type}`)}}>{PageLabels.Back}</Button>
                </ButtonGroup>
            </header>
            <div className={appStyles.container}>
                <TableSW tableData={detailContent} rowLimit={rowLimit} isDetailPage={true} type={type} />
            </div>
        </>
    );
}

export default Detail;