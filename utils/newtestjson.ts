export const jsondata = [
    {
        "screen": {
            "name": "Splash Screen",
            "width": 270,
            "height": 500
        },
        "component": [
            {
                "id": "splash-root",
                "type": "container",
                "children": [
                    {
                        "id": "splash-overlay",
                        "type": "container",
                        "children": [
                            {
                                "id": "app-logo",
                                "type": "text",
                                "content": "CoffeeCraft",
                                "style": {
                                    "fontSize": "24px",
                                    "fontWeight": "600",
                                    "color": "#ffffff",
                                    "textAlign": "center",
                                    "marginBottom": "10px",
                                    "animation": "fadeIn 1s ease-in",
                                    "zIndex": 2
                                }
                            },
                            {
                                "id": "coffee-cup-animation",
                                "type": "image",
                                "src": "https://v3.fal.media/files/monkey/Z4-IaoCHWJhX4pLJfxp8A.png",
                                "style": {
                                    "width": "80px",
                                    "height": "80px",
                                    "objectFit": "contain",
                                    "margin": "0 auto",
                                    "animation": "fadeIn 1.5s ease-in",
                                    "zIndex": 2
                                }
                            },
                            {
                                "id": "tagline",
                                "type": "text",
                                "content": "Brewed to Perfection",
                                "style": {
                                    "fontSize": "16px",
                                    "fontStyle": "italic",
                                    "color": "#ffffff",
                                    "textAlign": "center",
                                    "marginTop": "10px",
                                    "textShadow": "0 2px 4px rgba(0,0,0,0.4)",
                                    "zIndex": 2
                                }
                            }
                        ],
                        "style": {
                            "display": "flex",
                            "flexDirection": "column",
                            "justifyContent": "center",
                            "alignItems": "center",
                            "height": "100%",
                            "backgroundColor": "rgba(0,0,0,0.35)",
                            "padding": "20px"
                        }
                    }
                ],
                "style": {
                    "backgroundImage": "url('https://v3.fal.media/files/penguin/lqzJvbibTebckzxTh10kG.png')",
                    "backgroundSize": "cover",
                    "backgroundPosition": "center",
                    "width": "100%",
                    "height": "100%",
                    "display": "flex",
                    "justifyContent": "center",
                    "alignItems": "center",
                    "zIndex": 1
                }
            }
        ]
    },
    {
        "screen": {
            "name": "Onboarding Screen",
            "width": 270,
            "height": 500
        },
        "component": [
            {
                "id": "onboarding-root",
                "type": "container",
                "children": [
                    {
                        "id": "onboarding-slider",
                        "type": "container",
                        "children": [
                            {
                                "id": "onboard-step-1",
                                "type": "container",
                                "children": [
                                    {
                                        "id": "step1-image",
                                        "type": "image",
                                        "src": "https://v3.fal.media/files/monkey/Z4-IaoCHWJhX4pLJfxp8A.png",
                                        "style": {
                                            "width": "100%",
                                            "height": "240px",
                                            "objectFit": "cover",
                                            "borderRadius": "8px"
                                        }
                                    },
                                    {
                                        "id": "step1-text",
                                        "type": "container",
                                        "children": [
                                            {
                                                "id": "step1-title",
                                                "type": "text",
                                                "content": "Crafted With Passion.",
                                                "style": {
                                                    "fontSize": "20px",
                                                    "fontWeight": "700",
                                                    "color": "#333333",
                                                    "textAlign": "center",
                                                    "marginTop": "15px"
                                                }
                                            },
                                            {
                                                "id": "step1-subtitle",
                                                "type": "text",
                                                "content": "Our coffee is made from freshly roasted beans with love.",
                                                "style": {
                                                    "fontSize": "14px",
                                                    "color": "#555555",
                                                    "textAlign": "center",
                                                    "marginTop": "5px",
                                                    "paddingLeft": "10px",
                                                    "paddingRight": "10px"
                                                }
                                            }
                                        ],
                                        "style": {
                                            "marginTop": "10px"
                                        }
                                    }
                                ],
                                "style": {
                                    "padding": "10px",
                                    "width": "100%",
                                    "flexShrink": 0
                                }
                            },
                            {
                                "id": "onboard-step-2",
                                "type": "container",
                                "children": [
                                    {
                                        "id": "step2-image",
                                        "type": "image",
                                        "src": "https://v3.fal.media/files/zebra/euEQYvgSNHM1CeDV4Smcl.png",
                                        "style": {
                                            "width": "100%",
                                            "height": "240px",
                                            "objectFit": "cover",
                                            "borderRadius": "8px"
                                        }
                                    },
                                    {
                                        "id": "step2-text",
                                        "type": "container",
                                        "children": [
                                            {
                                                "id": "step2-title",
                                                "type": "text",
                                                "content": "A Place to Connect.",
                                                "style": {
                                                    "fontSize": "20px",
                                                    "fontWeight": "700",
                                                    "color": "#333333",
                                                    "textAlign": "center",
                                                    "marginTop": "15px"
                                                }
                                            },
                                            {
                                                "id": "step2-subtitle",
                                                "type": "text",
                                                "content": "Come hang out, work, or relax with a perfect brew.",
                                                "style": {
                                                    "fontSize": "14px",
                                                    "color": "#555555",
                                                    "textAlign": "center",
                                                    "marginTop": "5px",
                                                    "paddingLeft": "10px",
                                                    "paddingRight": "10px"
                                                }
                                            }
                                        ],
                                        "style": {
                                            "marginTop": "10px"
                                        }
                                    }
                                ],
                                "style": {
                                    "padding": "10px",
                                    "width": "100%",
                                    "flexShrink": 0
                                }
                            },
                            {
                                "id": "onboard-step-3",
                                "type": "container",
                                "children": [
                                    {
                                        "id": "step3-image",
                                        "type": "image",
                                        "src": "https://v3.fal.media/files/koala/Ds2_NBvqfUaX6elOiIAzv.png",
                                        "style": {
                                            "width": "100%",
                                            "height": "240px",
                                            "objectFit": "cover",
                                            "borderRadius": "8px"
                                        }
                                    },
                                    {
                                        "id": "step3-text",
                                        "type": "container",
                                        "children": [
                                            {
                                                "id": "step3-title",
                                                "type": "text",
                                                "content": "Order Ahead & Save Time.",
                                                "style": {
                                                    "fontSize": "20px",
                                                    "fontWeight": "700",
                                                    "color": "#333333",
                                                    "textAlign": "center",
                                                    "marginTop": "15px"
                                                }
                                            },
                                            {
                                                "id": "step3-subtitle",
                                                "type": "text",
                                                "content": "Skip the line and enjoy your coffee faster.",
                                                "style": {
                                                    "fontSize": "14px",
                                                    "color": "#555555",
                                                    "textAlign": "center",
                                                    "marginTop": "5px",
                                                    "paddingLeft": "10px",
                                                    "paddingRight": "10px"
                                                }
                                            }
                                        ],
                                        "style": {
                                            "marginTop": "10px"
                                        }
                                    }
                                ],
                                "style": {
                                    "padding": "10px",
                                    "width": "100%",
                                    "flexShrink": 0
                                }
                            }
                        ],
                        "style": {
                            "display": "flex",
                            "flexDirection": "row",
                            "overflowX": "scroll",
                            "scrollbarWidth": "thin",
                            "scrollbarColor": "transparent transparent",
                            "paddingBottom": "10px"
                        }
                    },
                    {
                        "id": "onboarding-footer",
                        "type": "container",
                        "children": [
                            {
                                "id": "dots-indicator",
                                "type": "container",
                                "children": [
                                    {
                                        "id": "dot-1",
                                        "type": "container",
                                        "style": {
                                            "width": "8px",
                                            "height": "8px",
                                            "backgroundColor": "#888888",
                                            "borderRadius": "50%",
                                            "margin": "0 4px"
                                        }
                                    },
                                    {
                                        "id": "dot-2",
                                        "type": "container",
                                        "style": {
                                            "width": "8px",
                                            "height": "8px",
                                            "backgroundColor": "#888888",
                                            "borderRadius": "50%",
                                            "margin": "0 4px"
                                        }
                                    },
                                    {
                                        "id": "dot-3",
                                        "type": "container",
                                        "style": {
                                            "width": "8px",
                                            "height": "8px",
                                            "backgroundColor": "#555555",
                                            "borderRadius": "50%",
                                            "margin": "0 4px"
                                        }
                                    }
                                ],
                                "style": {
                                    "display": "flex",
                                    "justifyContent": "center",
                                    "marginBottom": "10px"
                                }
                            },
                            {
                                "id": "get-started-button",
                                "type": "button",
                                "content": "Get Started",
                                "style": {
                                    "width": "100%",
                                    "padding": "12px",
                                    "backgroundColor": "#3E8E7E",
                                    "color": "#ffffff",
                                    "fontSize": "16px",
                                    "fontWeight": "600",
                                    "border": "none",
                                    "borderRadius": "25px",
                                    "cursor": "pointer"
                                }
                            }
                        ],
                        "style": {
                            "padding": "0 20px",
                            "marginTop": "10px"
                        }
                    }
                ],
                "style": {
                    "display": "flex",
                    "flexDirection": "column",
                    "justifyContent": "space-between",
                    "height": "100%",
                    "paddingTop": "20px",
                    "paddingBottom": "20px"
                }
            }
        ]
    },
    {
        "screen": {
            "name": "Home Screen",
            "width": 270,
            "height": 600
        },
        "component": [
            {
                "id": "home-root",
                "type": "container",
                "children": [
                    {
                        "id": "nav-bar",
                        "type": "container",
                        "children": [
                            {
                                "id": "nav-logo",
                                "type": "text",
                                "content": "CoffeeCraft",
                                "style": {
                                    "fontSize": "18px",
                                    "fontWeight": "700",
                                    "color": "#3E8E7E"
                                }
                            },
                            {
                                "id": "nav-notification",
                                "type": "image",
                                "src": "https://img.icons8.com/ios-filled/50/000000/appointment-reminders.png",
                                "style": {
                                    "width": "20px",
                                    "height": "20px",
                                    "objectFit": "contain"
                                }
                            }
                        ],
                        "style": {
                            "display": "flex",
                            "flexDirection": "row",
                            "justifyContent": "space-between",
                            "alignItems": "center",
                            "padding": "10px 15px",
                            "borderBottom": "1px solid #eeeeee"
                        }
                    },
                    {
                        "id": "greeting-section",
                        "type": "container",
                        "children": [
                            {
                                "id": "greeting-text",
                                "type": "text",
                                "content": "Good Morning, Alex",
                                "style": {
                                    "fontSize": "16px",
                                    "fontWeight": "600",
                                    "color": "#333333",
                                    "marginBottom": "4px"
                                }
                            },
                            {
                                "id": "location-text",
                                "type": "text",
                                "content": "Downtown Coffee - Open Until 8PM",
                                "style": {
                                    "fontSize": "12px",
                                    "color": "#777777"
                                }
                            }
                        ],
                        "style": {
                            "padding": "10px 15px"
                        }
                    },
                    {
                        "id": "search-bar",
                        "type": "container",
                        "children": [
                            {
                                "id": "search-input",
                                "type": "input",
                                "placeholder": "Search drinks, snacks...",
                                "style": {
                                    "width": "100%",
                                    "padding": "8px 12px",
                                    "borderRadius": "20px",
                                    "border": "1px solid #cccccc",
                                    "fontSize": "14px"
                                }
                            },
                            {
                                "id": "search-icon",
                                "type": "image",
                                "src": "https://img.icons8.com/ios-filled/50/000000/search.png",
                                "style": {
                                    "width": "16px",
                                    "height": "16px",
                                    "position": "relative",
                                    "left": "-30px",
                                    "top": "8px"
                                }
                            }
                        ],
                        "style": {
                            "padding": "0 15px",
                            "marginBottom": "10px"
                        }
                    },
                    {
                        "id": "category-scroll",
                        "type": "container",
                        "children": [
                            {
                                "id": "cat-coffee",
                                "type": "button",
                                "content": "Coffee",
                                "style": {
                                    "padding": "6px 12px",
                                    "backgroundColor": "#e0f2f1",
                                    "color": "#00796b",
                                    "border": "none",
                                    "borderRadius": "15px",
                                    "fontSize": "12px",
                                    "marginRight": "6px"
                                }
                            },
                            {
                                "id": "cat-tea",
                                "type": "button",
                                "content": "Tea",
                                "style": {
                                    "padding": "6px 12px",
                                    "backgroundColor": "#e0f2f1",
                                    "color": "#00796b",
                                    "border": "none",
                                    "borderRadius": "15px",
                                    "fontSize": "12px",
                                    "marginRight": "6px"
                                }
                            },
                            {
                                "id": "cat-pastry",
                                "type": "button",
                                "content": "Pastry",
                                "style": {
                                    "padding": "6px 12px",
                                    "backgroundColor": "#e0f2f1",
                                    "color": "#00796b",
                                    "border": "none",
                                    "borderRadius": "15px",
                                    "fontSize": "12px",
                                    "marginRight": "6px"
                                }
                            },
                            {
                                "id": "cat-snacks",
                                "type": "button",
                                "content": "Snacks",
                                "style": {
                                    "padding": "6px 12px",
                                    "backgroundColor": "#e0f2f1",
                                    "color": "#00796b",
                                    "border": "none",
                                    "borderRadius": "15px",
                                    "fontSize": "12px",
                                    "marginRight": "6px"
                                }
                            },
                            {
                                "id": "cat-specials",
                                "type": "button",
                                "content": "Specials",
                                "style": {
                                    "padding": "6px 12px",
                                    "backgroundColor": "#e0f2f1",
                                    "color": "#00796b",
                                    "border": "none",
                                    "borderRadius": "15px",
                                    "fontSize": "12px"
                                }
                            }
                        ],
                        "style": {
                            "display": "flex",
                            "flexDirection": "row",
                            "overflowX": "scroll",
                            "padding": "0 15px",
                            "marginBottom": "10px"
                        }
                    },
                    {
                        "id": "featured-carousel",
                        "type": "container",
                        "children": [
                            {
                                "id": "promo-card-1",
                                "type": "container",
                                "children": [
                                    {
                                        "id": "promo-image-1",
                                        "type": "image",
                                        "src": "https://v3.fal.media/files/tiger/XKmWaOkJ3tvJE-NqVKgy8.png",
                                        "style": {
                                            "width": "100%",
                                            "height": "120px",
                                            "objectFit": "cover",
                                            "borderRadius": "8px"
                                        }
                                    },
                                    {
                                        "id": "promo-text-1",
                                        "type": "text",
                                        "content": "20% Off Cold Brew Today!",
                                        "style": {
                                            "fontSize": "14px",
                                            "fontWeight": "600",
                                            "color": "#ffffff",
                                            "position": "relative",
                                            "top": "-30px",
                                            "textAlign": "center"
                                        }
                                    }
                                ],
                                "style": {
                                    "backgroundColor": "#00000080",
                                    "borderRadius": "8px",
                                    "marginRight": "10px",
                                    "padding": "5px",
                                    "width": "200px"
                                }
                            },
                            {
                                "id": "promo-card-2",
                                "type": "container",
                                "children": [
                                    {
                                        "id": "promo-image-2",
                                        "type": "image",
                                        "src": "https://v3.fal.media/files/monkey/Z4-IaoCHWJhX4pLJfxp8A.png",
                                        "style": {
                                            "width": "100%",
                                            "height": "120px",
                                            "objectFit": "cover",
                                            "borderRadius": "8px"
                                        }
                                    },
                                    {
                                        "id": "promo-text-2",
                                        "type": "text",
                                        "content": "Try Our New Matcha Latte",
                                        "style": {
                                            "fontSize": "14px",
                                            "fontWeight": "600",
                                            "color": "#ffffff",
                                            "position": "relative",
                                            "top": "-30px",
                                            "textAlign": "center"
                                        }
                                    }
                                ],
                                "style": {
                                    "backgroundColor": "#00000080",
                                    "borderRadius": "8px",
                                    "padding": "5px",
                                    "width": "200px"
                                }
                            }
                        ],
                        "style": {
                            "display": "flex",
                            "flexDirection": "row",
                            "overflowX": "scroll",
                            "padding": "0 15px",
                            "marginBottom": "10px"
                        }
                    },
                    {
                        "id": "popular-grid",
                        "type": "container",
                        "children": [
                            {
                                "id": "popular-item-1",
                                "type": "container",
                                "children": [
                                    {
                                        "id": "item-image-1",
                                        "type": "image",
                                        "src": "https://v3.fal.media/files/tiger/XKmWaOkJ3tvJE-NqVKgy8.png",
                                        "style": {
                                            "width": "100%",
                                            "height": "80px",
                                            "objectFit": "cover",
                                            "borderRadius": "8px"
                                        }
                                    },
                                    {
                                        "id": "item-name-1",
                                        "type": "text",
                                        "content": "Cold Brew",
                                        "style": {
                                            "fontSize": "14px",
                                            "fontWeight": "600",
                                            "marginTop": "5px",
                                            "color": "#333333",
                                            "textAlign": "center"
                                        }
                                    },
                                    {
                                        "id": "item-price-1",
                                        "type": "text",
                                        "content": "$3.50",
                                        "style": {
                                            "fontSize": "12px",
                                            "color": "#777777",
                                            "textAlign": "center",
                                            "marginTop": "3px"
                                        }
                                    },
                                    {
                                        "id": "add-to-cart-1",
                                        "type": "button",
                                        "content": "+",
                                        "style": {
                                            "backgroundColor": "#3E8E7E",
                                            "color": "#ffffff",
                                            "border": "none",
                                            "borderRadius": "50%",
                                            "width": "24px",
                                            "height": "24px",
                                            "alignSelf": "center",
                                            "marginTop": "5px",
                                            "cursor": "pointer"
                                        },
                                        "hoverStyle": {
                                            "transform": "translateY(-2px)"
                                        }
                                    }
                                ],
                                "style": {
                                    "padding": "8px",
                                    "margin": "4px",
                                    "backgroundColor": "#ffffff",
                                    "borderRadius": "8px",
                                    "boxShadow": "0 2px 4px rgba(0,0,0,0.1)",
                                    "width": "45%"
                                }
                            },
                            {
                                "id": "popular-item-2",
                                "type": "container",
                                "children": [
                                    {
                                        "id": "item-image-2",
                                        "type": "image",
                                        "src": "https://v3.fal.media/files/monkey/Z4-IaoCHWJhX4pLJfxp8A.png",
                                        "style": {
                                            "width": "100%",
                                            "height": "80px",
                                            "objectFit": "cover",
                                            "borderRadius": "8px"
                                        }
                                    },
                                    {
                                        "id": "item-name-2",
                                        "type": "text",
                                        "content": "Espresso",
                                        "style": {
                                            "fontSize": "14px",
                                            "fontWeight": "600",
                                            "marginTop": "5px",
                                            "color": "#333333",
                                            "textAlign": "center"
                                        }
                                    },
                                    {
                                        "id": "item-price-2",
                                        "type": "text",
                                        "content": "$2.75",
                                        "style": {
                                            "fontSize": "12px",
                                            "color": "#777777",
                                            "textAlign": "center",
                                            "marginTop": "3px"
                                        }
                                    },
                                    {
                                        "id": "add-to-cart-2",
                                        "type": "button",
                                        "content": "+",
                                        "style": {
                                            "backgroundColor": "#3E8E7E",
                                            "color": "#ffffff",
                                            "border": "none",
                                            "borderRadius": "50%",
                                            "width": "24px",
                                            "height": "24px",
                                            "alignSelf": "center",
                                            "marginTop": "5px",
                                            "cursor": "pointer"
                                        },
                                        "hoverStyle": {
                                            "transform": "translateY(-2px)"
                                        }
                                    }
                                ],
                                "style": {
                                    "padding": "8px",
                                    "margin": "4px",
                                    "backgroundColor": "#ffffff",
                                    "borderRadius": "8px",
                                    "boxShadow": "0 2px 4px rgba(0,0,0,0.1)",
                                    "width": "45%"
                                }
                            }
                        ],
                        "style": {
                            "display": "flex",
                            "flexWrap": "wrap",
                            "justifyContent": "space-between",
                            "padding": "0 15px",
                            "marginBottom": "50px"
                        }
                    },
                    {
                        "id": "bottom-nav",
                        "type": "container",
                        "children": [
                            {
                                "id": "nav-home",
                                "type": "button",
                                "content": "Home",
                                "style": {
                                    "fontSize": "12px",
                                    "color": "#3E8E7E",
                                    "background": "none",
                                    "border": "none"
                                }
                            },
                            {
                                "id": "nav-menu",
                                "type": "button",
                                "content": "Menu",
                                "style": {
                                    "fontSize": "12px",
                                    "color": "#777777",
                                    "background": "none",
                                    "border": "none"
                                }
                            },
                            {
                                "id": "nav-order",
                                "type": "button",
                                "content": "Order",
                                "style": {
                                    "fontSize": "12px",
                                    "color": "#777777",
                                    "background": "none",
                                    "border": "none"
                                }
                            },
                            {
                                "id": "nav-rewards",
                                "type": "button",
                                "content": "Rewards",
                                "style": {
                                    "fontSize": "12px",
                                    "color": "#777777",
                                    "background": "none",
                                    "border": "none"
                                }
                            },
                            {
                                "id": "nav-profile",
                                "type": "button",
                                "content": "Profile",
                                "style": {
                                    "fontSize": "12px",
                                    "color": "#777777",
                                    "background": "none",
                                    "border": "none"
                                }
                            }
                        ],
                        "style": {
                            "display": "flex",
                            "justifyContent": "space-around",
                            "alignItems": "center",
                            "padding": "10px 0",
                            "borderTop": "1px solid #eeeeee",
                            "position": "fixed",
                            "bottom": 0,
                            "width": "100%",
                            "backgroundColor": "#ffffff"
                        }
                    }
                ],
                "style": {
                    "backgroundColor": "#f9f9f9",
                    "height": "100%",
                    "overflowY": "auto"
                }
            }
        ]
    },
    {
        "screen": {
            "name": "Menu Screen",
            "width": 270,
            "height": 600
        },
        "component": [
            {
                "id": "menu-root",
                "type": "container",
                "children": [
                    {
                        "id": "filter-bar",
                        "type": "container",
                        "children": [
                            {
                                "id": "filter-all",
                                "type": "button",
                                "content": "All",
                                "style": {
                                    "padding": "6px 10px",
                                    "backgroundColor": "#3E8E7E",
                                    "color": "#ffffff",
                                    "border": "none",
                                    "borderRadius": "15px",
                                    "fontSize": "12px",
                                    "marginRight": "4px"
                                }
                            },
                            {
                                "id": "filter-hot",
                                "type": "button",
                                "content": "Hot Drinks",
                                "style": {
                                    "padding": "6px 10px",
                                    "backgroundColor": "#e0f2f1",
                                    "color": "#00796b",
                                    "border": "none",
                                    "borderRadius": "15px",
                                    "fontSize": "12px",
                                    "marginRight": "4px"
                                }
                            },
                            {
                                "id": "filter-cold",
                                "type": "button",
                                "content": "Cold Drinks",
                                "style": {
                                    "padding": "6px 10px",
                                    "backgroundColor": "#e0f2f1",
                                    "color": "#00796b",
                                    "border": "none",
                                    "borderRadius": "15px",
                                    "fontSize": "12px",
                                    "marginRight": "4px"
                                }
                            },
                            {
                                "id": "filter-food",
                                "type": "button",
                                "content": "Food",
                                "style": {
                                    "padding": "6px 10px",
                                    "backgroundColor": "#e0f2f1",
                                    "color": "#00796b",
                                    "border": "none",
                                    "borderRadius": "15px",
                                    "fontSize": "12px",
                                    "marginRight": "4px"
                                }
                            },
                            {
                                "id": "filter-seasonal",
                                "type": "button",
                                "content": "Seasonal",
                                "style": {
                                    "padding": "6px 10px",
                                    "backgroundColor": "#e0f2f1",
                                    "color": "#00796b",
                                    "border": "none",
                                    "borderRadius": "15px",
                                    "fontSize": "12px"
                                }
                            }
                        ],
                        "style": {
                            "display": "flex",
                            "flexDirection": "row",
                            "padding": "10px 15px",
                            "overflowX": "auto"
                        }
                    },
                    {
                        "id": "menu-list",
                        "type": "container",
                        "children": [
                            {
                                "id": "menu-item-1",
                                "type": "container",
                                "children": [
                                    {
                                        "id": "menu-item-image-1",
                                        "type": "image",
                                        "src": "https://v3.fal.media/files/tiger/XKmWaOkJ3tvJE-NqVKgy8.png",
                                        "style": {
                                            "width": "60px",
                                            "height": "60px",
                                            "objectFit": "cover",
                                            "borderRadius": "8px",
                                            "marginRight": "10px"
                                        }
                                    },
                                    {
                                        "id": "menu-item-info-1",
                                        "type": "container",
                                        "children": [
                                            {
                                                "id": "menu-item-name-1",
                                                "type": "text",
                                                "content": "Cappuccino",
                                                "style": {
                                                    "fontSize": "16px",
                                                    "fontWeight": "600",
                                                    "color": "#333333"
                                                }
                                            },
                                            {
                                                "id": "menu-item-desc-1",
                                                "type": "text",
                                                "content": "Rich and foamy espresso.",
                                                "style": {
                                                    "fontSize": "12px",
                                                    "color": "#777777"
                                                }
                                            }
                                        ],
                                        "style": {
                                            "flex": 1
                                        }
                                    },
                                    {
                                        "id": "menu-item-price-1",
                                        "type": "text",
                                        "content": "$3.75",
                                        "style": {
                                            "fontSize": "14px",
                                            "color": "#333333",
                                            "marginRight": "10px"
                                        }
                                    },
                                    {
                                        "id": "menu-add-cart-1",
                                        "type": "button",
                                        "content": "+",
                                        "style": {
                                            "backgroundColor": "#3E8E7E",
                                            "color": "#ffffff",
                                            "padding": "6px",
                                            "border": "none",
                                            "borderRadius": "50%",
                                            "cursor": "pointer"
                                        }
                                    }
                                ],
                                "style": {
                                    "display": "flex",
                                    "flexDirection": "row",
                                    "alignItems": "center",
                                    "padding": "10px 15px",
                                    "borderBottom": "1px solid #eeeeee"
                                }
                            },
                            {
                                "id": "menu-item-2",
                                "type": "container",
                                "children": [
                                    {
                                        "id": "menu-item-image-2",
                                        "type": "image",
                                        "src": "https://v3.fal.media/files/monkey/Z4-IaoCHWJhX4pLJfxp8A.png",
                                        "style": {
                                            "width": "60px",
                                            "height": "60px",
                                            "objectFit": "cover",
                                            "borderRadius": "8px",
                                            "marginRight": "10px"
                                        }
                                    },
                                    {
                                        "id": "menu-item-info-2",
                                        "type": "container",
                                        "children": [
                                            {
                                                "id": "menu-item-name-2",
                                                "type": "text",
                                                "content": "Latte",
                                                "style": {
                                                    "fontSize": "16px",
                                                    "fontWeight": "600",
                                                    "color": "#333333"
                                                }
                                            },
                                            {
                                                "id": "menu-item-desc-2",
                                                "type": "text",
                                                "content": "Smooth espresso with steamed milk.",
                                                "style": {
                                                    "fontSize": "12px",
                                                    "color": "#777777"
                                                }
                                            }
                                        ],
                                        "style": {
                                            "flex": 1
                                        }
                                    },
                                    {
                                        "id": "menu-item-price-2",
                                        "type": "text",
                                        "content": "$4.00",
                                        "style": {
                                            "fontSize": "14px",
                                            "color": "#333333",
                                            "marginRight": "10px"
                                        }
                                    },
                                    {
                                        "id": "menu-add-cart-2",
                                        "type": "button",
                                        "content": "+",
                                        "style": {
                                            "backgroundColor": "#3E8E7E",
                                            "color": "#ffffff",
                                            "padding": "6px",
                                            "border": "none",
                                            "borderRadius": "50%",
                                            "cursor": "pointer"
                                        }
                                    }
                                ],
                                "style": {
                                    "display": "flex",
                                    "flexDirection": "row",
                                    "alignItems": "center",
                                    "padding": "10px 15px",
                                    "borderBottom": "1px solid #eeeeee"
                                }
                            }
                        ],
                        "style": {
                            "overflowY": "scroll",
                            "height": "calc(100% - 60px)"
                        }
                    }
                ],
                "style": {
                    "backgroundColor": "#ffffff",
                    "height": "100%"
                }
            }
        ]
    },
    {
        "screen": {
            "name": "Drink Detail Screen",
            "width": 270,
            "height": 600
        },
        "component": [
            {
                "id": "drink-detail-root",
                "type": "container",
                "children": [
                    {
                        "id": "detail-background",
                        "type": "image",
                        "src": "https://v3.fal.media/files/monkey/Z4-IaoCHWJhX4pLJfxp8A.png",
                        "style": {
                            "width": "100%",
                            "height": "250px",
                            "objectFit": "cover",
                            "filter": "brightness(0.7)"
                        }
                    },
                    {
                        "id": "detail-overlay",
                        "type": "container",
                        "children": [
                            {
                                "id": "drink-name",
                                "type": "text",
                                "content": "Caramel Latte",
                                "style": {
                                    "fontSize": "22px",
                                    "fontWeight": "700",
                                    "color": "#ffffff",
                                    "marginBottom": "4px"
                                }
                            },
                            {
                                "id": "drink-price",
                                "type": "text",
                                "content": "$4.50",
                                "style": {
                                    "fontSize": "18px",
                                    "color": "#ffffff",
                                    "marginBottom": "8px"
                                }
                            },
                            {
                                "id": "favorite-icon",
                                "type": "image",
                                "src": "https://img.icons8.com/ios-filled/50/ffffff/like--v1.png",
                                "style": {
                                    "width": "20px",
                                    "height": "20px"
                                }
                            },
                            {
                                "id": "customization-options",
                                "type": "container",
                                "children": [
                                    {
                                        "id": "size-selector",
                                        "type": "container",
                                        "children": [
                                            {
                                                "id": "size-s",
                                                "type": "button",
                                                "content": "S",
                                                "style": {
                                                    "padding": "8px",
                                                    "border": "1px solid #ffffff",
                                                    "borderRadius": "50%",
                                                    "color": "#ffffff",
                                                    "marginRight": "6px"
                                                }
                                            },
                                            {
                                                "id": "size-m",
                                                "type": "button",
                                                "content": "M",
                                                "style": {
                                                    "padding": "8px",
                                                    "border": "1px solid #ffffff",
                                                    "borderRadius": "50%",
                                                    "color": "#ffffff",
                                                    "marginRight": "6px"
                                                }
                                            },
                                            {
                                                "id": "size-l",
                                                "type": "button",
                                                "content": "L",
                                                "style": {
                                                    "padding": "8px",
                                                    "border": "1px solid #ffffff",
                                                    "borderRadius": "50%",
                                                    "color": "#ffffff"
                                                }
                                            }
                                        ],
                                        "style": {
                                            "display": "flex",
                                            "flexDirection": "row",
                                            "marginBottom": "10px"
                                        }
                                    },
                                    {
                                        "id": "milk-options",
                                        "type": "input",
                                        "placeholder": "Select Milk Option",
                                        "style": {
                                            "width": "100%",
                                            "padding": "8px",
                                            "borderRadius": "8px",
                                            "border": "1px solid #cccccc",
                                            "marginBottom": "10px"
                                        }
                                    },
                                    {
                                        "id": "addons-chips",
                                        "type": "container",
                                        "children": [
                                            {
                                                "id": "addon-shot",
                                                "type": "button",
                                                "content": "Extra Shot",
                                                "style": {
                                                    "padding": "6px 10px",
                                                    "border": "1px solid #ffffff",
                                                    "borderRadius": "15px",
                                                    "color": "#ffffff",
                                                    "marginRight": "6px"
                                                }
                                            },
                                            {
                                                "id": "addon-cream",
                                                "type": "button",
                                                "content": "Whipped Cream",
                                                "style": {
                                                    "padding": "6px 10px",
                                                    "border": "1px solid #ffffff",
                                                    "borderRadius": "15px",
                                                    "color": "#ffffff",
                                                    "marginRight": "6px"
                                                }
                                            },
                                            {
                                                "id": "addon-oat",
                                                "type": "button",
                                                "content": "Oat Milk",
                                                "style": {
                                                    "padding": "6px 10px",
                                                    "border": "1px solid #ffffff",
                                                    "borderRadius": "15px",
                                                    "color": "#ffffff"
                                                }
                                            }
                                        ],
                                        "style": {
                                            "display": "flex",
                                            "flexDirection": "row",
                                            "marginBottom": "10px"
                                        }
                                    },
                                    {
                                        "id": "notes-field",
                                        "type": "input",
                                        "placeholder": "Add a note...",
                                        "style": {
                                            "width": "100%",
                                            "padding": "8px",
                                            "borderRadius": "8px",
                                            "border": "1px solid #cccccc"
                                        }
                                    }
                                ],
                                "style": {
                                    "marginTop": "15px"
                                }
                            }
                        ],
                        "style": {
                            "position": "relative",
                            "top": "-180px",
                            "backgroundColor": "rgba(0,0,0,0.5)",
                            "padding": "15px",
                            "borderTopLeftRadius": "15px",
                            "borderTopRightRadius": "15px"
                        }
                    },
                    {
                        "id": "detail-footer",
                        "type": "container",
                        "children": [
                            {
                                "id": "quantity-changer",
                                "type": "container",
                                "children": [
                                    {
                                        "id": "decrease-qty",
                                        "type": "button",
                                        "content": "-",
                                        "style": {
                                            "padding": "8px",
                                            "backgroundColor": "#eeeeee",
                                            "border": "none",
                                            "borderRadius": "50%",
                                            "fontSize": "18px",
                                            "minWidth": "30px"
                                        }
                                    },
                                    {
                                        "id": "current-qty",
                                        "type": "text",
                                        "content": "1",
                                        "style": {
                                            "fontSize": "16px",
                                            "margin": "0 10px",
                                            "color": "#ffffff"
                                        }
                                    },
                                    {
                                        "id": "increase-qty",
                                        "type": "button",
                                        "content": "+",
                                        "style": {
                                            "padding": "8px",
                                            "backgroundColor": "#eeeeee",
                                            "border": "none",
                                            "borderRadius": "50%",
                                            "fontSize": "18px",
                                            "minWidth": "30px"
                                        }
                                    }
                                ],
                                "style": {
                                    "display": "flex",
                                    "alignItems": "center"
                                }
                            },
                            {
                                "id": "add-to-cart-detail",
                                "type": "button",
                                "content": "Add to Cart",
                                "style": {
                                    "width": "100%",
                                    "padding": "12px",
                                    "backgroundColor": "#ff7043",
                                    "color": "#ffffff",
                                    "fontSize": "16px",
                                    "fontWeight": "700",
                                    "border": "none",
                                    "borderRadius": "25px",
                                    "marginTop": "10px",
                                    "cursor": "pointer"
                                }
                            }
                        ],
                        "style": {
                            "padding": "0 15px",
                            "marginTop": "15px"
                        }
                    }
                ],
                "style": {
                    "display": "flex",
                    "flexDirection": "column",
                    "height": "100%",
                    "overflowY": "auto",
                    "backgroundColor": "#f2f2f2"
                }
            }
        ]
    },
    {
        "screen": {
            "name": "Order Summary Screen",
            "width": 270,
            "height": 600
        },
        "component": [
            {
                "id": "order-summary-root",
                "type": "container",
                "children": [
                    {
                        "id": "order-items-list",
                        "type": "container",
                        "children": [
                            {
                                "id": "order-item-1",
                                "type": "container",
                                "children": [
                                    {
                                        "id": "order-item-thumb-1",
                                        "type": "image",
                                        "src": "https://v3.fal.media/files/tiger/XKmWaOkJ3tvJE-NqVKgy8.png",
                                        "style": {
                                            "width": "50px",
                                            "height": "50px",
                                            "objectFit": "cover",
                                            "borderRadius": "8px",
                                            "marginRight": "10px"
                                        }
                                    },
                                    {
                                        "id": "order-item-info-1",
                                        "type": "container",
                                        "children": [
                                            {
                                                "id": "order-item-name-1",
                                                "type": "text",
                                                "content": "Cappuccino",
                                                "style": {
                                                    "fontSize": "16px",
                                                    "fontWeight": "600",
                                                    "color": "#333333"
                                                }
                                            },
                                            {
                                                "id": "order-item-custom-1",
                                                "type": "text",
                                                "content": "Extra shot, Almond Milk",
                                                "style": {
                                                    "fontSize": "12px",
                                                    "color": "#777777"
                                                }
                                            }
                                        ],
                                        "style": {
                                            "flex": 1
                                        }
                                    },
                                    {
                                        "id": "order-item-qty-1",
                                        "type": "container",
                                        "children": [
                                            {
                                                "id": "decrease-order-qty-1",
                                                "type": "button",
                                                "content": "-",
                                                "style": {
                                                    "padding": "4px 8px",
                                                    "backgroundColor": "#eeeeee",
                                                    "border": "none",
                                                    "borderRadius": "4px"
                                                }
                                            },
                                            {
                                                "id": "current-order-qty-1",
                                                "type": "text",
                                                "content": "1",
                                                "style": {
                                                    "fontSize": "14px",
                                                    "margin": "0 6px"
                                                }
                                            },
                                            {
                                                "id": "increase-order-qty-1",
                                                "type": "button",
                                                "content": "+",
                                                "style": {
                                                    "padding": "4px 8px",
                                                    "backgroundColor": "#eeeeee",
                                                    "border": "none",
                                                    "borderRadius": "4px"
                                                }
                                            }
                                        ],
                                        "style": {
                                            "display": "flex",
                                            "alignItems": "center"
                                        }
                                    },
                                    {
                                        "id": "order-item-price-1",
                                        "type": "text",
                                        "content": "$3.75",
                                        "style": {
                                            "fontSize": "14px",
                                            "color": "#333333",
                                            "marginLeft": "10px"
                                        }
                                    }
                                ],
                                "style": {
                                    "display": "flex",
                                    "flexDirection": "row",
                                    "alignItems": "center",
                                    "padding": "10px 15px",
                                    "borderBottom": "1px solid #eeeeee"
                                }
                            }
                        ],
                        "style": {
                            "maxHeight": "250px",
                            "overflowY": "auto"
                        }
                    },
                    {
                        "id": "promo-code-field",
                        "type": "input",
                        "placeholder": "Enter Promo Code",
                        "style": {
                            "width": "calc(100% - 30px)",
                            "padding": "10px",
                            "margin": "15px",
                            "borderRadius": "8px",
                            "border": "1px solid #cccccc"
                        }
                    },
                    {
                        "id": "delivery-toggle",
                        "type": "container",
                        "children": [
                            {
                                "id": "toggle-delivery",
                                "type": "button",
                                "content": "Delivery",
                                "style": {
                                    "padding": "8px 12px",
                                    "backgroundColor": "#3E8E7E",
                                    "color": "#ffffff",
                                    "border": "none",
                                    "borderRadius": "20px",
                                    "marginRight": "5px",
                                    "fontSize": "12px"
                                }
                            },
                            {
                                "id": "toggle-pickup",
                                "type": "button",
                                "content": "Pickup",
                                "style": {
                                    "padding": "8px 12px",
                                    "backgroundColor": "#e0f2f1",
                                    "color": "#00796b",
                                    "border": "none",
                                    "borderRadius": "20px",
                                    "fontSize": "12px"
                                }
                            }
                        ],
                        "style": {
                            "display": "flex",
                            "justifyContent": "center",
                            "marginBottom": "15px"
                        }
                    },
                    {
                        "id": "address-or-time",
                        "type": "input",
                        "placeholder": "Enter Address or Select Pickup Time",
                        "style": {
                            "width": "calc(100% - 30px)",
                            "padding": "10px",
                            "margin": "0 15px 15px 15px",
                            "borderRadius": "8px",
                            "border": "1px solid #cccccc"
                        }
                    },
                    {
                        "id": "total-section",
                        "type": "container",
                        "children": [
                            {
                                "id": "estimated-total",
                                "type": "text",
                                "content": "Estimated Total: $3.75",
                                "style": {
                                    "fontSize": "16px",
                                    "fontWeight": "600",
                                    "color": "#333333",
                                    "textAlign": "center"
                                }
                            }
                        ],
                        "style": {
                            "padding": "10px 15px"
                        }
                    },
                    {
                        "id": "proceed-to-payment",
                        "type": "button",
                        "content": "Proceed to Payment",
                        "style": {
                            "width": "calc(100% - 30px)",
                            "padding": "12px",
                            "backgroundColor": "#3E8E7E",
                            "color": "#ffffff",
                            "fontSize": "16px",
                            "fontWeight": "600",
                            "border": "none",
                            "borderRadius": "25px",
                            "margin": "15px auto",
                            "display": "block",
                            "cursor": "pointer"
                        }
                    }
                ],
                "style": {
                    "backgroundColor": "#f9f9f9",
                    "height": "100%",
                    "overflowY": "auto"
                }
            }
        ]
    },
    {
        "screen": {
            "name": "Profile/Rewards Screen",
            "width": 270,
            "height": 600
        },
        "component": [
            {
                "id": "profile-root",
                "type": "container",
                "children": [
                    {
                        "id": "profile-header",
                        "type": "container",
                        "children": [
                            {
                                "id": "profile-picture",
                                "type": "image",
                                "src": "https://img.icons8.com/ios-filled/100/3E8E7E/user-male-circle.png",
                                "style": {
                                    "width": "80px",
                                    "height": "80px",
                                    "borderRadius": "50%",
                                    "alignSelf": "center",
                                    "marginBottom": "10px"
                                }
                            },
                            {
                                "id": "profile-name",
                                "type": "text",
                                "content": "Alex Johnson",
                                "style": {
                                    "fontSize": "18px",
                                    "fontWeight": "700",
                                    "textAlign": "center",
                                    "color": "#333333"
                                }
                            },
                            {
                                "id": "member-level",
                                "type": "text",
                                "content": "Gold Member",
                                "style": {
                                    "fontSize": "14px",
                                    "color": "#777777",
                                    "textAlign": "center"
                                }
                            }
                        ],
                        "style": {
                            "padding": "15px"
                        }
                    },
                    {
                        "id": "rewards-progress",
                        "type": "container",
                        "children": [
                            {
                                "id": "progress-text",
                                "type": "text",
                                "content": "150/200 Beans for Free Drink",
                                "style": {
                                    "fontSize": "14px",
                                    "color": "#333333",
                                    "marginBottom": "5px",
                                    "textAlign": "center"
                                }
                            },
                            {
                                "id": "progress-bar-container",
                                "type": "container",
                                "children": [
                                    {
                                        "id": "progress-bar",
                                        "type": "container",
                                        "style": {
                                            "width": "75%",
                                            "height": "10px",
                                            "backgroundColor": "#3E8E7E",
                                            "borderRadius": "5px"
                                        }
                                    }
                                ],
                                "style": {
                                    "width": "100%",
                                    "display": "flex",
                                    "justifyContent": "center"
                                }
                            }
                        ],
                        "style": {
                            "padding": "0 15px 15px 15px"
                        }
                    },
                    {
                        "id": "profile-buttons-list",
                        "type": "container",
                        "children": [
                            {
                                "id": "btn-my-orders",
                                "type": "button",
                                "content": "My Orders",
                                "style": {
                                    "width": "100%",
                                    "padding": "12px",
                                    "backgroundColor": "#ffffff",
                                    "border": "1px solid #eeeeee",
                                    "borderRadius": "8px",
                                    "marginBottom": "10px",
                                    "fontSize": "14px",
                                    "color": "#333333"
                                }
                            },
                            {
                                "id": "btn-saved-items",
                                "type": "button",
                                "content": "Saved Items",
                                "style": {
                                    "width": "100%",
                                    "padding": "12px",
                                    "backgroundColor": "#ffffff",
                                    "border": "1px solid #eeeeee",
                                    "borderRadius": "8px",
                                    "marginBottom": "10px",
                                    "fontSize": "14px",
                                    "color": "#333333"
                                }
                            },
                            {
                                "id": "btn-payment-methods",
                                "type": "button",
                                "content": "Payment Methods",
                                "style": {
                                    "width": "100%",
                                    "padding": "12px",
                                    "backgroundColor": "#ffffff",
                                    "border": "1px solid #eeeeee",
                                    "borderRadius": "8px",
                                    "marginBottom": "10px",
                                    "fontSize": "14px",
                                    "color": "#333333"
                                }
                            },
                            {
                                "id": "btn-settings",
                                "type": "button",
                                "content": "Settings",
                                "style": {
                                    "width": "100%",
                                    "padding": "12px",
                                    "backgroundColor": "#ffffff",
                                    "border": "1px solid #eeeeee",
                                    "borderRadius": "8px",
                                    "marginBottom": "10px",
                                    "fontSize": "14px",
                                    "color": "#333333"
                                }
                            },
                            {
                                "id": "btn-logout",
                                "type": "button",
                                "content": "Logout",
                                "style": {
                                    "width": "100%",
                                    "padding": "12px",
                                    "backgroundColor": "#ff7043",
                                    "border": "none",
                                    "borderRadius": "8px",
                                    "fontSize": "14px",
                                    "color": "#ffffff"
                                }
                            }
                        ],
                        "style": {
                            "padding": "0 15px",
                            "marginBottom": "15px"
                        }
                    },
                    {
                        "id": "referral-banner",
                        "type": "container",
                        "children": [
                            {
                                "id": "referral-text",
                                "type": "text",
                                "content": "Give $5, Get $5",
                                "style": {
                                    "fontSize": "16px",
                                    "fontWeight": "600",
                                    "color": "#ffffff",
                                    "textAlign": "center",
                                    "padding": "10px"
                                }
                            }
                        ],
                        "style": {
                            "backgroundColor": "#3E8E7E",
                            "borderRadius": "8px",
                            "margin": "0 15px"
                        }
                    }
                ],
                "style": {
                    "backgroundColor": "#f9f9f9",
                    "height": "100%",
                    "overflowY": "auto"
                }
            }
        ]
    }
]