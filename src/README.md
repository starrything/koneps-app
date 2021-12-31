# 구성
## 목록
- index.js : public/index.html 에서 root 에 렌더링  
- App.js : index.js에 추가하는 root 컴포넌트  
- Gnb.js : App.js에 추가되는 Global Navigation Bar  

### index.js
#### default import
```JSX
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
```
#### added import
```JSX
// react router
import { BrowserRouter } from 'react-router-dom';
```
```JSX
// Bootstrap UI
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
```
- <BrowserRouter> 적용 for react-router-dom  
```JSX
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
```
### App.js
- default import  
```JSX
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
```
- add components  
```JSX
import Gnb from './Gnb';
import Main from './Main';
import Database from './pages/data/Database';
import Dataset from './pages/data/Dataset';
import Charts from './pages/charts/Charts';
import Dashboards from './pages/dashboards/Dashboards';
```
- source review  
```JSX
class App extends Component {
  render() {
    return (
      <div className="App">
        <Gnb />
        <Route exact path="/" component={Main} />
        <Switch>
          <Route path="/data/database/list" component={Database} />
          <Route path="/data/dataset/list" component={Dataset} />
          <Route path="/chart/list" component={Chart} />
          <Route path="/chart/add" component={AddChart} />
          <Route path="/chart/make" component={MakeChart} />
          <Route path="/dashboard/list" component={Dashboard} />
          <Route path="/dashboard/add" component={AddDashboard} />
          {/* <Route path={`/chart/make/:chartId`} component={MakeChart} /> */}
          {/* <Route path="/chart/make/:chartId" render={(props) => <MakeChart {...props}/>} /> */}
        </Switch>
      </div>
    );
  }
}
```
Route path 주의! -> /dashboard, /dashboard/add 와 같이 2개 있는경우 "/dashboard/add" 세부 path가 "/dashboard"에 씹힙니다.  
