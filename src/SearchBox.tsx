import { createEffect, For, on, Setter, useContext } from 'solid-js';
import debounce from 'lodash-es/debounce';
import { Data, IData } from './App';
import { TagButton } from './components/TagButton';
import { reflect } from '@cn-ui/use';
import { untrack } from 'solid-js/web';
import { sampleSize as _sampleSize } from 'lodash-es';
import { CreateIData, stringToTags } from './use/TagsConvertor';

/** 重新设计的随机函数 */
const sampleSize = (list: IData[], size: number) => {
    const one = _sampleSize(list.slice(0, 1000), Math.ceil(size / 4));
    const two = _sampleSize(list.slice(1000, 10000), Math.ceil(size / 4));
    const three = _sampleSize(list.slice(10000, 20000), Math.ceil(size / 4));
    const four = _sampleSize(list.slice(20000), Math.ceil(size / 4));
    return [...one, ...two, ...three, ...four];
};

export const SearchBox = () => {
    const { usersCollection, result, lists, searchText, r18Mode, tagsPerPage, searchNumberLimit } =
        useContext(Data);
    const showingResult = reflect(() => {
        const num = untrack(tagsPerPage);
        return result().slice(0, num);
    });

    // fixed 修复搜索完成之后没回去的问题
    let searchResult: HTMLDivElement;
    createEffect(on(showingResult, () => searchResult.scrollTo(0, 0)));

    const triggerSearch = debounce(searchText, 200) as Setter<string>;
    return (
        <>
            <nav class="flex w-full items-center">
                <input
                    class="input my-2 mr-1 flex-1"
                    value={searchText()}
                    placeholder="搜索关键词，中文也可以"
                    oninput={(e: any) => triggerSearch(e.target.value)}
                ></input>

                <span class="btn flex-none" onclick={() => triggerSearch('')}>
                    清除
                </span>
                <span
                    class="btn flex-none"
                    onclick={() => {
                        const name = searchText();
                        usersCollection((i) => [...i, ...stringToTags(name, lists())]);
                    }}
                >
                    创建
                </span>
            </nav>
            <section class="flex h-full w-full flex-1 flex-col overflow-hidden">
                <nav class="flex text-sm text-gray-400">
                    <span class="flex-none">
                        搜索结果 {result().length} / {lists() ? lists().length : '加载中'}
                    </span>

                    <span class="flex-1"></span>
                    <div
                        class="btn flex-none"
                        onclick={() => {
                            searchNumberLimit((i) => {
                                if (i === 0) return 10;
                                if (i === 1000000) return 0;
                                return i * 10;
                            });
                        }}
                    >
                        {searchNumberLimit() === 0
                            ? '无数目筛选'
                            : `> ${searchNumberLimit().toLocaleString('en')}`}
                    </div>
                    <span
                        class="btn flex-none"
                        onclick={() => {
                            result(sampleSize(lists(), tagsPerPage()));
                        }}
                    >
                        随机 {tagsPerPage()}
                    </span>
                </nav>
                <section
                    class="my-2 flex h-full flex-wrap items-start  overflow-y-auto overflow-x-hidden"
                    ref={searchResult}
                >
                    <For each={showingResult()}>
                        {(item) => (
                            <TagButton
                                data={item}
                                onClick={(item) =>
                                    usersCollection((i) => [...i, CreateIData(item)])
                                }
                            ></TagButton>
                        )}
                    </For>
                </section>
            </section>
        </>
    );
};
