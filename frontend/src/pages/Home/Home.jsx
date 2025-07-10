import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import Header from '../../components/Header/Header';
import './Home.css';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import AppDownload from '../../components/AppDownload/AppDownload';

const Home = () => {


    return (
        <>
            <Header/>
            <ExploreMenu />
            <FoodDisplay />
            <AppDownload/>
        </>
    )
}

export default Home
