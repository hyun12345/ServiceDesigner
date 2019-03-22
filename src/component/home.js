import React from 'react';
import PubsubService from './../service/pubsub.service'
import CodeSandbox from 'react-code-sandbox'
import ReactStrapService from '../service/reactstrap.service'
import DataService from '../service/data.service'

const { remote } = window.require('electron')
const fs = window.require('fs')
export default class Home extends React.Component {

    state = {
        page: '',
        selected: null,
        imports: [{library: ReactStrapService, items: ['Container']}],
        code: '<Container></Container>'
    }

    componentWillMount() {
        PubsubService.sub(PubsubService.KEY_OPEN_PAGE).subscribe(value=> {
            if (value) {
                const layout = DataService.get(value)
                this.setState({
                    page: value,
                    imports:layout.imports,
                    code:layout.code
                })
            }
        })
        PubsubService.sub(PubsubService.KEY_LAYOUT_UPDATED).subscribe(value=> {
            if (value) {
                let selected_id = -1
                if (this.state.selected) {
                    selected_id = this.state.selected.id
                }
                const layout = DataService.get(this.state.page, selected_id)
                this.setState({
                    imports:layout.imports,
                    code: layout.code
                })
            }
        })
        PubsubService.sub(PubsubService.KEY_SELECT_ELEMENT).subscribe(item=> {
            if (item) {
                const layout = DataService.get(this.state.page, item.id)
                this.setState({
                    selected: item,
                    imports:layout.imports,
                    code: layout.code
                })
            }
        })
        PubsubService.sub(PubsubService.KEY_SAVE).subscribe(value=> {
            if (value) {
                const js = DataService.getReactJs();
                const output = {data: DataService.getSaveForm(), components: DataService.components}
                const dirs = remote.dialog.showOpenDialog({ properties: ['openDirectory'] })
                if (dirs) {
                    fs.writeFile(dirs[0]+'/design.json', JSON.stringify(output), err=> {
                        if (err) {
                            return console.log(err)
                        }
                        console.log('saved json')
                    });
                    fs.writeFile(dirs[0]+'/design.js', js, err=> {
                        if (err) {
                            return console.log(err)
                        }
                        console.log('saved js')
                    });
                }
            }
        })
        PubsubService.sub(PubsubService.KEY_LOAD).subscribe(value=> {
            if (value) {
                const file = remote.dialog.showOpenDialog({ properties: ['openFile'] })
                if (file) {
                    fs.readFile(file[0], (err, data)=> {
                        if (err) throw err
                        try {
                            const json = JSON.parse(data.toString())
                            DataService.setLoadData(json.data)
                            DataService.components = json.components
                        }catch(e) {console.log(e)}
                    })
                }
            }
        })
    }

    render() {
        const imp = {React}
        this.state.imports.forEach(lib=> {
            lib.items.forEach(item=> {
                imp[item] = lib.library.get(item)
            })
        })
        
        return <div id="design">
            <CodeSandbox imports={imp}>
            {'render(' +this.state.code + ')'}
            </CodeSandbox>
        </div>
    }
}
