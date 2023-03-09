import { Atom, DebounceAtom, atom, reflect, resource } from '@cn-ui/use';
import { For, batch, createEffect, onMount } from 'solid-js';
import { useMouse } from './useMouse';
import { GlobalPlugin } from '../GlobalPlugin';
import { Translate } from '.';
import { AC } from '../../components/AC';
import { debounce } from 'lodash-es';
import { Animate } from '@cn-ui/animate';
export const Select = (props: {
    value: Atom<string>;
    options: { value: string; label?: string }[];
}) => {
    return (
        <select
            class="bg-slate-900"
            value={props.value()}
            onchange={(e) => {
                /** @ts-ignore */
                props.value(e.target.val);
            }}
        >
            <For each={props.options}>
                {(item) => {
                    return <option value={item.value}>{item.label ?? item.value}</option>;
                }}
            </For>
        </select>
    );
};

/**
 * @example const app = useBlackBoard(BD,'keyName'); app().function()
 */
export const TranslationPanel = () => {
    const show = atom(false);
    const disabled = reflect(() => !show());
    const { x, y } = useMouse({ type: 'client', disabled });
    const input = atom('');
    const data = resource(
        () => {
            return Translate(input(), source(), target());
        },
        { deps: [input], immediately: false }
    );
    const source = atom('en');
    const target = atom('zh');
    const langs = [
        { value: 'zh', label: '英语' },
        { value: 'en', label: '简中' },
    ];
    let hovering = false;
    const delayClose = debounce(() => {
        !hovering && show(false);
    }, 2000);
    createEffect(() => data.isReady() && delayClose());
    GlobalPlugin.register('translation', {
        show,
        translate(text) {
            batch(() => {
                show(true);
                input(text);
                delayClose();
            });
        },
    });

    return (
        <Animate anime="scale" trigger={show}>
            <nav
                class="fixed z-40  max-w-xs rounded-md bg-slate-700 ring-2  ring-slate-700 transition-all ease-linear "
                onmouseenter={() => {
                    disabled(true);
                    hovering = true;
                    delayClose();
                }}
                onmouseleave={() => {
                    disabled(false);
                    hovering = false;
                    delayClose();
                }}
                style={{
                    top: y() + 20 + 'px',
                    left: x() + 20 + 'px',
                }}
            >
                <header class="flex border-b border-slate-400 px-2 py-1">
                    <div>魔导翻译器</div>
                    <div class="flex-1"></div>
                    <button class="btn" onclick={() => show(false)}>
                        x
                    </button>
                </header>
                <div class="flex justify-between gap-2 py-1">
                    <Select value={source} options={langs}></Select>
                    <button
                        class="btn"
                        onClick={() => {
                            batch(() => {
                                const a = target();
                                target(source());
                                source(a);
                                data.refetch();
                            });
                        }}
                    >
                        ♾️
                    </button>
                    <Select value={target} options={langs}></Select>
                </div>
                <AC resource={data}>
                    <p class="whitespace-pre-wrap p-2" style="word-break: break-all;">
                        {data()}
                    </p>
                </AC>
            </nav>
        </Animate>
    );
};
