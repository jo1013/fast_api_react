import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PostMain from './page/post/PostMain';
import PostDetail from './page/post/PostDetail';  
import PostCreate from './page/post/PostCreate';  
import Signup from './page/user/Signup';  // <-- Signup 컴포넌트를 임포트합니다.

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/signup" component={Signup} />  {/* <-- Signup 라우트를 추가 */}
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
