// App.js 예시
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PostMain from './page/post/PostMain';
import PostDetail from './page/post/PostDetail';  // 위에서 만든 PostDetail 컴포넌트를 임포트합니다.
import PostCreate from './page/post/PostCreate';  // <-- Import PostCreate



function App() {
    return (
        <div className="App">
            <Router>
                <Switch>

                    <Route path="/create" component={PostCreate} />  
                    <Route exact path='/post/:postId' component={PostDetail} />
                    <Route exact path='/' component={PostMain} />
                    {/* 필요한 다른 라우트들을 여기에 추가 */}
                </Switch>
            </Router>
        </div>
    );
}

export default App;
