import React from 'react';
import { 
    FaFolder,
    FaCode,
    FaCog,
    FaFileImport,
    FaSave,
    FaUndo
 } from 'react-icons/fa'
import SidebarFolder from './folder';
import SidebarCode from './code';
import SidebarProperty from './property';
import PubsubService from './../../service/pubsub.service';
import { FolderManager } from './../../manager/folder.manager';
import { LayoutManager } from './../../manager/layout.manager';
import { ElementManager } from './../../manager/element.manager';
import { DataManager } from './../../manager/data.manager';

export default class Sidebar extends React.Component {

    state = {
        tab: 'folder',
        folder: {},
        selectedFolder: 0,
        layout: {},
        selected: 0,
        elements: []
    }

    dataManager;

    componentWillMount() {
        this.dataManager = DataManager.getInstance(DataManager);
        const folderManager = FolderManager.getInstance(FolderManager);
        const layoutManager = LayoutManager.getInstance(LayoutManager);
        const elementManager = ElementManager.getInstance(ElementManager); 

        PubsubService.sub(PubsubService.KEY_RELOAD_SIDEBAR).subscribe(value=> {
            this.setState({
                folder: folderManager.data,
                selectedFolder: folderManager.selected,
                layout: layoutManager.data,
                selected: layoutManager.selected,
                elements: elementManager.data
            })
        })
    }

    icon(iconTag) {
        iconTag = React.cloneElement(iconTag, {style:styles.baricon})
        return <div styles={styles.baricon}>
            {iconTag}
        </div>
    }

    render() {
        return (
            <div>
                <div style={styles.sidebar}>
                    {this.icon(<FaSave onClick={()=>this.dataManager.export()}/>)}
                    {this.icon(<FaFileImport onClick={()=>this.dataManager.import()}/>)}
                    {this.icon(<FaFolder onClick={()=>this.setState({tab:'folder'}) } />)}
                    {this.icon(<FaCode onClick={()=>this.setState({tab:'code'}) } />)}
                    {this.icon(<FaCog onClick={()=>this.setState({tab:'property'})} />)}
                    {this.icon(<FaUndo onClick={()=>console.log('undo')} />)}

                </div>
                <div style={styles.collapseSidebar}>
                    {this.state.tab === 'folder' && <SidebarFolder 
                        folder={this.state.folder} selectedFolder={this.state.selectedFolder}/>}
                    {this.state.tab === 'code' && <SidebarCode 
                        elements={this.state.elements}
                        layout={this.state.layout} selected={this.state.selected} />}
                    {this.state.tab === 'property' && <SidebarProperty 
                        layout={this.state.layout} selected={this.state.selected} />}
                </div>
                <div style={styles.body}>
                    {this.props.children}
                </div>
            </div>
        );
    }
};

const styles = {
    sidebar: {
        position:'absolute',
        width:40,
        top:0,
        left:0,
        bottom:0,
        backgroundColor:'#EEE',
        textAlign: 'center',
        zIndex:10
    },
    collapseSidebar: {
        transition: '0.5s',
        position:'absolute',
        width: 200,
        top:0,
        left:40,
        bottom:0,
        backgroundColor:'#EEE',
        zIndex:5,
        overflow:'auto'
    },
    baricon: {
        cursor:'pointer'
    },
    body: {
        top:0,
        bottom:0,
        left:240,
        right:0,
        position: 'absolute',
        overflow:'auto'
    }
}