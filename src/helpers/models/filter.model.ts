export interface FilterModel {
    id: number;
    name: string;
    group: string;
    param: string;
    checked: boolean;
    multiple: boolean;
    options: [any];
}
