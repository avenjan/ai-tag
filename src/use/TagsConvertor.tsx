import { IData } from '../App';

import { IPromptData, PromptToTags, TagsToPrompt } from 'promptor';

/** 预处理来源字符出串，将一些字符进行转换 */
export const PreProcess = (s: string) => {
    return s.replace(/_/g, ' ').split(/\r?\n/g);
};

export const breakSymbol: IData = {
    text: '\n',
    en: `\n`,
    cn: '这是一个换行符，你可以使用它进行词汇分割，不影响结果',
    r18: 0,
    count: -1,
    emphasize: 0,
};
/** 将字符串转化为 Tag 数组 */
export const stringToTags = (s: string, list: IData[] = []): IData[] => {
    //* 添加对换行符的处理，认为换行符是一个组的标记
    const data = PreProcess(s).map((i, index) => PromptToTags(i));
    return data.flatMap((part, index) => {
        const res = part.map((i) => {
            const en = list.find((it) => i.text === it.en);
            if (en) return { ...en, ...i };
            const cn = list.find((it) => i.text === it.cn);
            if (cn) return { ...cn, ...i };
            return {
                en: i.text,
                cn: i.text,
                count: Infinity,
                r18: 0,
                ...i,
            } as IData;
        });
        if (index === 0) return [...res];
        return [{ ...breakSymbol }, ...res];
    });
};

/** 将用户的 Tag 转化为字符串 */
export const TagsToString = (
    data: IData[],
    positive = '()',
    /** 默认是保留分隔符的 */
    keepBreakLine = true
) => {
    if (keepBreakLine) {
        let lastStart = 0;
        let final = [];

        for (let index = 0; index < data.length + 1; index++) {
            const element = data[index];
            if (data.length === index || element.text === '\n') {
                final.push(TagsToPrompt(data.slice(lastStart, index), positive));
                lastStart = index + 1;
            }
        }
        return final.join('\n');
    } else {
        return TagsToPrompt(
            data.filter((i) => i.text !== '\n'),
            positive
        );
    }
};

/** 守卫类型正确 */
export const CreateIData = (data: IData) => {
    if (data.text === undefined) data.text = data.en;
    if (data.en === undefined) data.en = data.text;
    if (data.cn === undefined) data.cn = data.text;
    // console.log(data);
    return data;
};
