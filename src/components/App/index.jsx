import '../../styles/picture.css';
/**
 * import a image
 */
import compareImg from '../../assets/compare.png';

const App = () => {
    return (
        <>
            <h1 className="beauty">Jay Webpack React</h1>
            {/**
             * 使用这个image
             */}
            <img src={compareImg} alt="girl compare" width="250" />
        </>
    );
};

export default App;
