declare interface Result<T = any> {
    code: number,
    msg: string,
    data: T
}

declare interface PageForm {
    page?: number,
    pageSize?: number,
}

declare interface PageVo {
    page?: number,
    pageSize?: number,
}