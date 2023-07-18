import { Button, ButtonGroup } from '@mui/material';
import { PageLinks, PageLabels } from '../../types/categories';
import styles from './Header.module.scss';
import { useSubmit } from 'react-router-dom';

function Header () {

    const submit = useSubmit();

    const changePage = (page: string) => {
        submit(null, { action: page, method: 'post' });
    }

    return(
        <>
            <header className={styles.header}>
                <ButtonGroup variant="outlined" aria-label="outlined button group">
                    <Button onClick={() => {changePage(PageLinks.All)}}>{PageLabels.All}</Button>
                    <Button onClick={() => {changePage(PageLinks.People)}}>{PageLabels.People}</Button>
                    <Button onClick={() => {changePage(PageLinks.Vehicles)}}>{PageLabels.Vehicles}</Button>
                    <Button onClick={() => {changePage(PageLinks.Planets)}}>{PageLabels.Planets}</Button>
                    <Button onClick={() => {changePage(PageLinks.Films)}}>{PageLabels.Films}</Button>
                    <Button onClick={() => {changePage(PageLinks.Species)}}>{PageLabels.Species}</Button>
                    <Button onClick={() => {changePage(PageLinks.Starships)}}>{PageLabels.Starships}</Button>
                </ButtonGroup>
            </header>
        </>
    );
}

export default Header;