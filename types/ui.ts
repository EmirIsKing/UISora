export interface UIComponent {
    type: string;
    text?: string;
    categories?: string[];
    items?: { name: string; price: string; image?: string }[];
}

export interface UIPage {
    name: string;
    components: UIComponent[];
}

export interface UIGenerationResponse {
    success: boolean;
    uiJson: {
        app_type: string;
        pages: UIPage[];
    };
}
