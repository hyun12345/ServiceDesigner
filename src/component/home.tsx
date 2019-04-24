import React from 'react';
import PubsubService from './../service/pubsub.service'
import CodeSandbox from 'react-code-sandbox'
import ReactStrapService from '../service/reactstrap.service'
import { DataManager } from './../manager/data.manager';
import { CssManager } from '../manager/css.manager';

export default class Home extends React.Component<any, any> {

    state:any = {
        imports: [{library: ReactStrapService, items: ['Container']}],
        code: '<Container></Container>'
    }

    dataManager:DataManager;
    cssManager:CssManager

    constructor(props:any) {
        super(props);
        this.dataManager = DataManager.getInstance(DataManager);
        this.cssManager = CssManager.getInstance(CssManager);
    }

    componentWillMount() {
        if (!this.dataManager.projectType) {
            this.props.history.push('/');
            return;
        }
        const style = document.createElement('style');
        document.head.appendChild(style);
        PubsubService.sub(PubsubService.KEY_RELOAD_HOME).subscribe((value:any)=> {
            this.setState(this.dataManager.render());
            style.innerHTML = this.cssManager.getCssFile();
        });
    }

    render() {
        const imp:any = {React}
        this.state.imports.forEach((lib:any)=> {
            if (lib.libname && lib.libname.indexOf('react-icons') !== -1) {
                const font_group = lib.libname.split('/')[1];
                imp[lib.items[0]] = DataManager.libTable['react-icons'].lib[font_group][lib.items[0]]
            } else if (lib.libname && lib.libname.indexOf('react-native-vector-icons') !== -1) {

            } else {
                lib.items.forEach((item:any)=> {
                    imp[item] = lib.library.get(item)
                })
            }
        })
        return <div id="design">
            { this.dataManager.projectType === 'react-native' && <img style={{height:'100vh'}} src="/frame.jpg" /> }
            <div style={(this.dataManager.projectType === 'react-native') ? styles.mobile : {}}>
                <CodeSandbox imports={imp}>
                {'state='+JSON.stringify(this.state.state)+';renderPart=(name)=>{};render(' +this.state.code + ')'}
                </CodeSandbox>
            </div>
        </div>
    }
}

const styles:any = {
    mobile: {
        width: '42.5vh',
        position: 'absolute',
        top: '12%',
        bottom: '12.5%',
        left: '3vh',
        overflow: 'auto'
    }
}