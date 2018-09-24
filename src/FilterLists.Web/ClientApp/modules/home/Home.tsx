import * as React from "react";
import { IColumnVisibility, ILanguage, IList, ISoftware, ITag } from "./interfaces";
import { Tagline, ListsTable } from "./components";

const columnVisibilityDefaults: IColumnVisibility[] = [
    { column: "Software", visible: true },
    { column: "Tags", visible: true },
    { column: "Languages", visible: true },
    { column: "Updated Date", visible: true }
];

interface IProps {
    languages: ILanguage[];
    lists: IList[];
    ruleCount: number;
    software: ISoftware[];
    tags: ITag[];
};

interface IState {
    columnVisibility: IColumnVisibility[];
    pageSize: number;
};

export class Home extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            columnVisibility: columnVisibilityDefaults,
            pageSize: 20
        };
        this.updatePageSize = this.updatePageSize.bind(this);
    }

    componentDidMount() {
        this.updatePageSize();
    };

    updatePageSize() {
        this.setState({
            pageSize: Math.max(Math.floor((window.innerHeight - 386) / 52), 5)
        });
    };

    render() {
        return <div>
                   <Tagline listCount={this.props.lists.length} ruleCount={this.props.ruleCount}/>
                   <ListsTable {...this.props} {...this.state}/>
                   {this.renderColumnVisibilityCheckboxes()}
               </div>;
    };

    renderColumnVisibilityCheckboxes() {
        return this.props.lists.length > 0
                   ? <div className="d-none d-md-block text-right">
                         Visible:&nbsp;&nbsp;{this.state.columnVisibility.map(
                         (c: IColumnVisibility, i: number) => this.renderColumnVisibilityCheckbox(c, i))}
                     </div>
                   : null;
    };

    renderColumnVisibilityCheckbox(props: IColumnVisibility, key: number) {
        return <div className="form-check form-check-inline" key={key}>
                   <input className="form-check-input"
                          type="checkbox"
                          id={`checkbox${props.column.replace(/\s+/g, "")}`}
                          defaultChecked={props.visible}
                          onChange={() => this.checkColumn(props)}/>
                   <label className="form-check-label"
                          htmlFor={`checkbox${props.column.replace(/\s+/g, "")}`}>
                       {props.column}
                   </label>
               </div>;
    };

    checkColumn(props: IColumnVisibility) {
        const columnVisibility = this.state.columnVisibility;
        const index = this.findWithAttr(columnVisibility, "column", props.column);
        columnVisibility[index].visible = !columnVisibility[index].visible;
        this.forceUpdate();
    };

    findWithAttr(array: any, attr: string, value: string) {
        for (let i = 0; i < array.length; i += 1) {
            if (array[i][attr] === value) {
                return i;
            }
        }
        return -1;
    };
};