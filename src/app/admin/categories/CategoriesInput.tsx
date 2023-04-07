import { DebounceAtom, atom, resource } from '@cn-ui/reactive';
import { AV } from '../../../api/cloud';
import { Component, For } from 'solid-js';
import { FloatPanelWithAnimate } from '@cn-ui/core';
import { debounce } from 'lodash-es';

export const CategoriesInput: Component<{
    onselect: (value: string) => void;
}> = (props) => {
    const searchText = atom('');
    const data = resource(
        () => {
            const ob = new AV.Query('gallery_category');
            return ob.contains('categories', searchText()).limit(10).find();
        },
        { initValue: [], immediately: false, deps: [DebounceAtom(searchText, 300)] }
    );
    const updateData = debounce(() => data.refetch());
    return (
        <FloatPanelWithAnimate
            animateProps={{ anime: 'scale' }}
            popup={() => {
                updateData();
                return (
                    <section class="rounded-lg bg-slate-900 p-2">
                        <header class="flex gap-2">
                            <input
                                type="text"
                                class="rounded-md bg-slate-800 px-2 py-1 outline-none"
                                value={searchText()}
                                oninput={(e) => searchText((e.target as any).value)}
                            />
                            <button class="btn" onclick={() => props.onselect(searchText())}>
                                创建
                            </button>
                        </header>
                        <ul class="flex flex-col gap-1">
                            <For each={data()}>
                                {(item) => {
                                    return (
                                        <li onclick={() => props.onselect(item.get('categories'))}>
                                            {item.get('categories')}
                                        </li>
                                    );
                                }}
                            </For>
                        </ul>
                    </section>
                );
            }}
        >
            <button class="btn">+</button>
        </FloatPanelWithAnimate>
    );
};
