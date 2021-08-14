//表格默认设置
export function dfColumns(columns) {
    if (!columns || columns.length === 0) {
        return;
    }
    columns.forEach(a => {
        a.align = a.align || 'center'
        a.ellipsis = 'true'
    })
    return columns;
}

//分页默认设置
export function dfPagination(query, params) {
    return {
        defaultPageSize: 15,
        pageSizeOptions: ['15', '30', '50', '100'],
        showQuickJumper: false,
        showSizeChanger: true,
        showTotal: (total, range) => {
            return `${range[0]}-${range[1]} 共 ${total} 条数据`
        },
        //点击页码
        onChange: (page, pageSize) => {
            if (query) {
                params = params || {};
                params.page = page;
                params.size = pageSize;
                query(params);
            }
        },
        //改变每页显示
        onShowSizeChange: (current, size) => {
            if (query) {
                params = params || {};
                params.page = current;
                params.size = size;
                query(params);
            }
        },
    }
}