export const Meta_Schema = {
    name: "generate_ui_layout",
    strict: false,
    schema: {
        type: "object",
        properties: {
            ui: {
                type: "array",
                description: "List of UI screens with components.",
                items: {
                    type: "object",
                    properties: {
                        screen: {
                            type: "object",
                            properties: {
                                name: { type: "string" },
                                width: { type: "number" },
                                height: { type: "number" }
                            },
                            required: ["name", "width", "height"]
                        },
                        component: {
                            type: "array",
                            items: {
                                $ref: "#/definitions/component"
                            }
                        }
                    },
                    required: ["screen", "component"]
                }
            }
        },
        required: ["ui"],
        definitions: {
            component: {
                type: "object",
                properties: {
                    id: { type: "string" },
                    x: { type: "number" },
                    y: { type: "number" },
                    width: { type: "number" },
                    height: { type: "number" },
                    type: { type: "string" },
                    src: { type: "string" },
                    source: { type: "string" },
                    placeholder: { type: "string" },
                    value: { type: "string" },
                    secureTextEntry: { type: "boolean" },
                    content: {
                        anyOf: [
                            { type: "string" },
                            {
                                type: "object",
                                properties: {
                                    title: { type: "string" },
                                    subtitle: { type: "string" }
                                },
                                additionalProperties: false
                            }
                        ]
                    },
                    style: { type: "object" },
                    hoverStyle: { type: "object" },
                    children: {
                        type: "array",
                        items: { $ref: "#/definitions/component" }
                    }
                },
                required: ["id", "x", "y", "width", "height", "type", "style"]
            }
        }
    }
};
