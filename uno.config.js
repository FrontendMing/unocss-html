import { defineConfig, presetUno, presetAttributify } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'
import transformerVariantGroup from '@unocss/transformer-variant-group'

export const theme = {
    colors: {
        primary: 'var(--primary-color)', // #FF5000
        main: 'var(--main-text-color)', // #333
        sub: 'var(--text-sub-color)', // #666
        info: "var(--weak-color)", // #999
        disable: "var(--disabled-color)", // #ccc
        weak: "var(--weak-color)", // #ddd
    },
    breakpoints: {
        sm: '320px',
        md: '640px',
        lg: '1024px',
    },
};

const shortcuts = {
    // flex 布局
    "flex-start": 'flex items-center justify-start',
    "flex-center": 'flex items-center justify-center ',
    "flex-between": 'flex items-center justify-between ',

    // 共用 button
    
};

// 生成规则
function createRules(prefix = 'j-', rate = 7.5, unit = 'vw') {

    const RegFc = props => ([, d]) => {
        
        const isArray = Object.prototype.toString.call(props).slice(8, -1) === 'Array'

        // props 为数组
        if (isArray) {
            return props.reduce((prev, next) => {
                prev[next] = `${d / rate}${unit}`
                return prev
            }, {})
        }

        // 默认
        return {
            [props]: `${d / rate}${unit}`
        }
    }

    return [
        [new RegExp("^" + prefix + "w-([\\.\\d]+)$"), RegFc('width')],
        [new RegExp("^" + prefix + "min-w-([\\.\\d]+)$"), RegFc('min-width')],
        [new RegExp("^" + prefix + "max-w-([\\.\\d]+)$"), RegFc('max-width')],
        [new RegExp("^" + prefix + "h-([\\.\\d]+)$"), RegFc('height')],
        [new RegExp("^" + prefix + "min-h-([\\.\\d]+)$"), RegFc('min-height')],
        [new RegExp("^" + prefix + "max-h-([\\.\\d]+)$"), RegFc('max-height')],
        [new RegExp("^" + prefix + "m-([\\.\\d]+)$"), RegFc('margin')],
        [new RegExp("^" + prefix + "mx-([\\.\\d]+)$"), RegFc(['margin-left', 'margin-right'])],
        [new RegExp("^" + prefix + "my-([\\.\\d]+)$"), RegFc(['margin-top', 'margin-bottom'])],
        [new RegExp("^" + prefix + "ml-([\\.\\d]+)$"), RegFc('margin-left')],
        [new RegExp("^" + prefix + "mr-([\\.\\d]+)$"), RegFc('margin-right')],
        [new RegExp("^" + prefix + "mt-([\\.\\d]+)$"), RegFc('margin-top')],
        [new RegExp("^" + prefix + "mb-([\\.\\d]+)$"), RegFc('margin-bottom')],
        [new RegExp("^" + prefix + "p-([\\.\\d]+)$"), RegFc('padding')],
        [new RegExp("^" + prefix + "px-([\\.\\d]+)$"), RegFc(['padding-left', 'padding-right'])],
        [new RegExp("^" + prefix + "py-([\\.\\d]+)$"), RegFc(['padding-top', 'padding-bottom'])],
        [new RegExp("^" + prefix + "pl-([\\.\\d]+)$"), RegFc('padding-left')],
        [new RegExp("^" + prefix + "pr-([\\.\\d]+)$"), RegFc('padding-right')],
        [new RegExp("^" + prefix + "pt-([\\.\\d]+)$"), RegFc('padding-top')],
        [new RegExp("^" + prefix + "pb-([\\.\\d]+)$"), RegFc('padding-bottom')],
        [new RegExp("^" + prefix + "top-([\\.\\d]+)$"), RegFc('top')],
        [new RegExp("^" + prefix + "right-([\\.\\d]+)$"), RegFc('right')],
        [new RegExp("^" + prefix + "bottom-([\\.\\d]+)$"), RegFc('bottom')],
        [new RegExp("^" + prefix + "left-([\\.\\d]+)$"), RegFc('left')],
        [new RegExp("^" + prefix + "gap-([\\.\\d]+)$"), RegFc('gap')],
        [new RegExp("^" + prefix + "gap-x-([\\.\\d]+)$"), RegFc('column-gap')],
        [new RegExp("^" + prefix + "gap-y-([\\.\\d]+)$"), RegFc('row-gap')],
        [new RegExp("^" + prefix + "border-([\\.\\d]+)$"), RegFc('border-width')],
        [new RegExp("^" + prefix + "border-l-([\\.\\d]+)$"), RegFc('border-left-width')],
        [new RegExp("^" + prefix + "border-r-([\\.\\d]+)$"), RegFc('border-right-width')],
        [new RegExp("^" + prefix + "border-t-([\\.\\d]+)$"), RegFc('border-top-width')],
        [new RegExp("^" + prefix + "border-b-([\\.\\d]+)$"), RegFc('border-bottom-width')],
        [new RegExp("^" + prefix + "rounded-([\\.\\d]+)$"), RegFc('border-radius')],
        [new RegExp("^" + prefix + "text-([\\.\\d]+)$"), RegFc('font-size')],
        [new RegExp("^" + prefix + "leading-([\\.\\d]+)$"), RegFc('line-height')],
    ]
}

export default defineConfig({
    presets: [
        presetUno(),
        presetAttributify()
    ],
    rules: [
        // 移动端
        ...createRules('', 7.5, 'vw'),

        // PC端 - 响应式
        ...createRules('j-', 19.2, 'vw'),
        // PC端 - 固定大小
        ...createRules('a-', 1, 'px'),

        // zoom 缩放
        [/^zoom-([\.\d]+)$/, ([_, d]) => ({ zoom: `${d}%` })],
    ],
    theme,
    shortcuts,
    transformers: [
        transformerDirectives({
            // the defaults
            applyVariable: ['--at-apply', '--uno-apply', '--uno'],
        }),
        transformerVariantGroup(),
    ],
});
