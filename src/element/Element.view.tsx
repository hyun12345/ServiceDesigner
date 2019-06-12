import React from 'react';
import { IoMdArrowDropright, IoMdArrowDropdown } from 'react-icons/io';
import { DiReact, DiHtml5, DiBootstrap } from 'react-icons/di';
import ScrollArea from 'react-scrollbar';
import { connectRouter } from '../redux/connection';
import { bindActionCreators } from 'redux';
import * as elementActions from './Element.action';
import * as layoutActions from '../layout/Layout.actions';
import * as propertyActions from '../property/Property.action';
import { Theme } from '../utils/Theme';
import { ContextMenuType, ElementType } from '../utils/constant';

class ElementView extends React.Component<any> {

    state:any =  {
        hover:'',
        collapse: true,
        ctxMenu:{
            x:0,
            y:0,
            display:'none',
            target:undefined
        },
    }

    clickItem(item) {
        const { ElementActions, PropertyActions } = this.props;
        ElementActions.selectElement(item);
        PropertyActions.choiceElement(item);
    }

    clickItemRight(e, item) {
        e.preventDefault();
        e.stopPropagation();
        const { LayoutActions, ElementActions, PropertyActions } = this.props;
        ElementActions.selectElement(item);
        PropertyActions.choiceElement(item);
        LayoutActions.showContextMenu({
            x:e.clientX,
            y:e.clientY,
            type: ContextMenuType.Element,
            target:item
        })
    }

    completeAdd() {
        const { ElementActions } = this.props;
        ElementActions.completeAdd()
    }

    getLibIcon(type:ElementType) {
        if (type === ElementType.Html) {
            return <DiHtml5 style={{...styles.arrow,...{color:Theme.iconHtmlColor}}} key={0}/>
        } else if (type === ElementType.Reactstrap) {
            return <DiBootstrap style={{...styles.arrow,...{color:Theme.iconBootstrapColor}}} key={0}/>
        } else {
            return <DiReact style={{...styles.arrow,...{color:Theme.iconReactColor}}} key={0}/>
        }
    }

    renderTitle() {
        const { data } = this.props;
        return <div id="element-title" style={styles.group}>
          <span onClick={()=>this.setState({collapse: !this.state.collapse})}>
            {!this.state.collapse && <IoMdArrowDropright style={styles.arrow} /> } 
            {this.state.collapse && <IoMdArrowDropdown style={styles.arrow} /> } 
            {data.element.component.name ? 
                data.element.component.name :
                'ELEMENTS'}
          </span>
        </div>
    }

    renderElement(elem, dep:number=0) {
        const { data } = this.props; 
        return <div key={elem.id}>
            <div style={Object.assign({
                    color:Theme.fontColor,
                    paddingTop:1,
                    paddingBottom:1,
                    paddingLeft:10+dep*5
                }, this.state.hover === elem.id && styles.hover, data.element.select && data.element.select.id === elem.id && styles.active)} 
                onMouseEnter={()=> this.setState({hover:elem.id})}
                onMouseLeave={()=> this.setState({hover:undefined})}
                onClick={()=> this.clickItem(elem)}
                onContextMenu={(e)=>this.clickItemRight(e, elem)}>
                {this.getLibIcon(elem.lib)}
                {elem.tag}
                {elem.prop.name && elem.prop.name.value !== '' && '[' + elem.prop.name.value + ']'}
                {this.renderInput(elem)}
            </div>
            {elem.children.map(item=> this.renderElement(item, dep+1))}
        </div>
    }

    renderInput(item) {
        const { data, ElementActions } = this.props;
        return <div style={{marginLeft:10}}>
            {data.element.insert.ing && (item ? item.id === data.element.select.id : data.element.select === undefined) && 
            [this.getLibIcon(data.element.insert.type),
            <input key={1} id="element-input"
            style={{...styles.insertInput,...{width:'calc(100% - 18px)'}}} 
            onChange={(e)=> ElementActions.updateName(e.target.value)} 
            onBlur={()=> this.completeAdd()}
            onKeyPress={(e)=> {
                if (e.key === 'Enter') {
                    this.completeAdd()
                }
            }}/>]}
        </div>
    }

    render() {
        let height = 1000;
        if (this.refs.layout) {
            const layout:any = this.refs.layout
            height = window.innerHeight - layout.offsetTop;
        }
        const { data } = this.props;
        return <div>
            {this.renderTitle()}
            <div style={Object.assign({}, styles.layout, this.state.collapse && styles.groupHide)} ref='layout' 
                onContextMenu={(e)=> this.clickItemRight(e, undefined)}>
                <ScrollArea style={{height:height}}
                    verticalScrollbarStyle={{backgroundColor:'white'}}>
                    {data.element.component && data.element.component.element.children.map(elem=> this.renderElement(elem))}
                    {this.renderInput(undefined)}
                </ScrollArea>
            </div>
        </div>
    }
}

const styles:any = {
    layout: {
        color:Theme.bgBodyColor,
        fontSize:11,
        maxHeight: 0,
        transition: 'max-height 0.15s ease-out',
        overflow: 'hidden'
    },
    hover: {
        backgroundColor:Theme.bgBodyHoverColor,
        cursor:'pointer'
    },
    active: {
        backgroundColor:Theme.bgBodyActiveColor,
        cursor: 'pointer'
    },
    arrow: {
        marginTop: -1,
        fontSize: 13,
        marginRight:5
    },
    group: {
        backgroundColor:Theme.bgHeadColor,
        color:Theme.fontColor,
        fontSize:10,
        fontWeight:600,
        padding:2,
        cursor:'pointer',
        userSelect:'none'
    },
    groupHide: {
        maxHeight: 1000,
        transition: 'max-height 0.25s ease-in'
    },
    insertInput: {
        fontSize:12,
        color:Theme.fontColor,
        backgroundColor:Theme.bgBodyActiveColor,
        borderWidth:0,
        outline:'none'
    }
}

export default connectRouter(
    (state) => ({
        data: {
            element: state.element
        }
    }),
    (dispatch) => ({
            ElementActions: bindActionCreators(elementActions, dispatch),
            LayoutActions: bindActionCreators(layoutActions, dispatch),
            PropertyActions: bindActionCreators(propertyActions, dispatch)
    }),
    ElementView
)