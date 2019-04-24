import React from 'react';
import { FaQuestion, FaSave, FaFileImport, FaFolder, FaCode, FaCog, FaUndo, FaRedo, FaReact, FaPalette, FaImages, FaCss3, FaFileExport } from 'react-icons/fa';

export class SidebarHelp extends React.Component {

    icon(children:any, desc:any) {
        return <div style={{padding:5}}>
            {children} {desc}
        </div>
    }

    render() {
        return <div>
            <h3>Help</h3>
            
            {this.icon(<FaQuestion  />, 'Help')}
            {this.icon(<FaFolder  />, 'Folder [F1]')}
            {this.icon(<FaReact />, 'State [F2]')}
            {this.icon(<FaCode />, 'Element [F3]')}
            {this.icon(<FaCog  />, 'Property / Style [F4]')}
            {this.icon(<FaCss3 />, 'Css [F5]')}
            {this.icon(<FaPalette />, 'Color [F6]')}
            {this.icon(<FaImages />, 'Asset [F7]')}
            {this.icon(<FaSave />, 'Save [Ctrl+s]')}
            {this.icon(<FaFileExport />, 'Export')}
            {this.icon(<FaFileImport />, 'Import')}
            {this.icon(<FaUndo />, 'Undo [Ctrl+z]')}
            {this.icon(<FaRedo />, 'Redo')}
        </div>
    }
}