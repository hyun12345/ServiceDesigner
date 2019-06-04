import React from 'react';
import ExplorerView from './Explorer.view';
import BottomView from './Bottom.view';

export class HomeView extends React.Component {
    render() {
        return <div style={styles.layout}>
            <ExplorerView />
            <div style={styles.main}>
                <iframe></iframe>
                <BottomView />
            </div>
        </div>
    }
}

const styles:any = {
    layout: {
        display:'flex'
    },
    main: {
        flex:1,
        position:'relative'
    }
}