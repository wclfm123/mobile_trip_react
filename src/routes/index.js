import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { IndexLayout, NotFound } from 'containers';
import { Publish, PublishList, Details, Message, Home } from 'components';
export default () => {
    return (
        <Route path="/" component={IndexLayout}>
            <IndexRoute component={Publish} />
            <Route path="/addMate" component={Publish} />
            <Route path="/home" component={Home} />
            <Route path="/details/:id" component={Details} />
            <Route path="/message" component={Message} />
            <Route path="/publishList" component={PublishList} />
            <Route path="*" component={NotFound} status={404} />
        </Route>
    );
};
