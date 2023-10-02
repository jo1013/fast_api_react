import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PostMain from './page/post/PostMain';
import PostDetail from './page/post/PostDetail';  // 위에서 만든 PostDetail 컴포넌트를 임포트합니다.

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route exact path='/post/:id' component={PostDetail} />
                    <Route exact path='/' component={PostMain} />
                    {/* 필요한 다른 라우트들을 여기에 추가 */}
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
