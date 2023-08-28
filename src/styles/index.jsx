export const colors = {
    white: '#ffffff',
    black: '#020203',
    dark_gray: '#282d30',
    neutral_gray: '#74798c',
    light_gray: '#9b9eac',
    primary: '#ff0101',
    secondary: '#e60000',
}

export const fonts = {
    medium_text: (color) => `
        ${color && `color: ${color};`}
        font-weight: 400;
        font-size: 18px;
    `,
    large_title: (color) => `
        ${color && `color: ${color};`}
        font-weight: 500;
        font-size: 48px;
    `,
    medium_title: (color) => `
        ${color && `color: ${color};`}
        font-weight: 500;
        font-size: 24px;
    `,
    small_title: (color) => `
        ${color && `color: ${color};`}
        font-weight: 500;
        font-size: 15px;
    `,
    xxl_label: (color) => `
        ${color && `color: ${color};`}
        font-weight: 700;
        font-size: 26px;
    `,
    xl_label: (color) => `
        ${color && `color: ${color};`}
        font-weight: 700;
        font-size: 20px;
    `,
    large_label: (color) => `
        ${color && `color: ${color};`}
        font-weight: 500;
        font-size: 16px;
    `,
    medium_label: (color) => `
        ${color && `color: ${color};`}
        font-weight: 500;
        font-size: 14px;
    `,
    small_label: (color) => `
        ${color && `color: ${color};`}
        font-weight: 500;
        font-size: 12px;
    `,
}
