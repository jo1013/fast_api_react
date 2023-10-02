
import { BrowserRouter, Route } from 'react-router-dom';
import PostMain from './page/post/PostMain';
import PostView from './page/post/PostView';
import PostCreate from './page/post/PostCreate'; // 위에서 생성한 컴포넌트를 임포트합니다.

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path='/postView/:no' component={PostView} />
        <Route exact path='/postCreate' component={PostCreate} /> {/* 새로운 라우트 추가 */}
        <Route exact path='/' component={PostMain} />
      </BrowserRouter>
    </div>
  );
}

export default App;
