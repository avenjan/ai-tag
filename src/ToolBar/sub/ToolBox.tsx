import { useContext } from 'solid-js';
import { Data } from '../../App';
import { Notice } from '../../utils/notice';
import { useTranslation } from '../../../i18n';
import { FloatPanel } from '../../components/FloatPanel';

export const ToolBox = () => {
    const { enMode, usersCollection, visibleId, lists, emphasizeSymbol, iconBtn } =
        useContext(Data);

    const { t } = useTranslation();
    return (
        <FloatPanel
            class="btn h-full bg-indigo-700"
            popup={
                <div class=" flex flex-col gap-2">
                    {/* 中英文切换符号 */}
                    <span class="btn bg-yellow-700 text-sm" onclick={() => enMode((i) => !i)}>
                        {iconBtn()
                            ? t('toolbar1.' + (enMode() ? 'en' : 'zh'))[0]
                            : t('toolbar1.' + (enMode() ? 'en' : 'zh'))}
                    </span>
                    <span
                        class="btn  bg-indigo-700   text-sm "
                        onClick={() => {
                            emphasizeSymbol((i) => (i === '{}' ? '()' : '{}'));
                            Notice.success(t('toolbar1.hint.bracketsChange'));
                        }}
                    >
                        {emphasizeSymbol().split('').join(' ')}
                    </span>
                </div>
            }
        >
            <span class="font-icon h-full w-full">build</span>
        </FloatPanel>
    );
};
