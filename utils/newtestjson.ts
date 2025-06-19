export const jsondata = {
    "ui": [
        {
            "screen": {
                "name": "Splash Screen",
                "width": 320,
                "height": 568
            },
            "component": {
                "type": "div",
                "content": [
                    {
                        "type": "div",
                        "content": [
                            {
                                "type": "div",
                                "content": [
                                    "BrewMate"
                                ],
                                "attributes": {
                                    "id": "splash-logo",
                                    "style": "display:inline-block; background:rgba(0,0,0,0.4); color:#fff; padding:10px 20px; border-radius:5px; font-family:'Georgia', serif; font-size:24px; animation:fadeIn 2s ease-in-out;"
                                }
                            }
                        ],
                        "attributes": {
                            "id": "splash-logo-overlay",
                            "style": "position:absolute; bottom:20px; width:100%; text-align:center;"
                        }
                    },
                    {
                        "type": "style",
                        "content": [
                            " @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } } "
                        ]
                    }
                ],
                "attributes": {
                    "id": "splash-screen-container",
                    "style": "width:320px; height:568px; background: url('https://v3.fal.media/files/elephant/Z2_vhHcu4J94RzWhbIELc.png') no-repeat center center; background-size: cover; position: relative;"
                }
            }
        },
        {
            "screen": {
                "name": "Onboarding Screen 1 - Welcome",
                "width": 320,
                "height": 600
            },
            "component": {
                "type": "div",
                "content": [
                    {
                        "type": "div",
                        "content": [
                            {
                                "type": "h2",
                                "content": [
                                    "Welcome to BrewMate"
                                ],
                                "attributes": {
                                    "id": "welcome-title",
                                    "style": "font-family:'Georgia', serif; font-size:22px; color:#5d4037; margin-bottom:15px;"
                                }
                            },
                            {
                                "type": "div",
                                "attributes": {
                                    "id": "welcome-image",
                                    "style": "width:100%; height:150px; background: url('https://v3.fal.media/files/panda/jyUmDO2hDda3dH9VhyUTA.png') no-repeat center center; background-size:cover; border-radius:8px; margin-bottom:15px;"
                                }
                            },
                            {
                                "type": "p",
                                "content": [
                                    "Discover the best brews in town. Order ahead and skip the line!"
                                ],
                                "attributes": {
                                    "id": "welcome-text",
                                    "style": "font-family:'Helvetica', sans-serif; font-size:14px; color:#4e342e; margin-bottom:20px;"
                                }
                            },
                            {
                                "type": "div",
                                "content": [
                                    {
                                        "type": "button",
                                        "content": [
                                            "Skip"
                                        ],
                                        "attributes": {
                                            "id": "skip-btn",
                                            "style": "background:#a1887f; color:#fff; border:none; padding:8px 12px; border-radius:5px; font-family:'Helvetica', sans-serif; box-shadow:0 2px 4px rgba(0,0,0,0.2);"
                                        }
                                    },
                                    {
                                        "type": "button",
                                        "content": [
                                            "Next"
                                        ],
                                        "attributes": {
                                            "id": "next-btn1",
                                            "style": "background:#6d4c41; color:#fff; border:none; padding:8px 12px; border-radius:5px; font-family:'Helvetica', sans-serif; box-shadow:0 2px 4px rgba(0,0,0,0.2);"
                                        }
                                    }
                                ],
                                "attributes": {
                                    "id": "onboarding1-buttons",
                                    "style": "display:flex; justify-content:space-between;"
                                }
                            }
                        ],
                        "attributes": {
                            "id": "welcome-card",
                            "style": "background:rgba(255,255,255,0.9); border-radius:10px; padding:20px; width:90%; max-width:300px; text-align:center; box-shadow:0 2px 8px rgba(0,0,0,0.1);"
                        }
                    }
                ],
                "attributes": {
                    "id": "onboarding1-container",
                    "style": "width:320px; min-height:600px; background:linear-gradient(135deg, #f3e2c7, #deb887); display:flex; align-items:center; justify-content:center; padding:20px;"
                }
            }
        },
        {
            "screen": {
                "name": "Onboarding Screen 2 - Customization",
                "width": 320,
                "height": 600
            },
            "component": {
                "type": "div",
                "content": [
                    {
                        "type": "div",
                        "content": [
                            {
                                "type": "h2",
                                "content": [
                                    "Your Coffee, Your Way"
                                ],
                                "attributes": {
                                    "id": "customization-title",
                                    "style": "font-family:'Georgia', serif; font-size:22px; color:#5d4037; margin-bottom:15px;"
                                }
                            },
                            {
                                "type": "div",
                                "content": [
                                    {
                                        "type": "div",
                                        "attributes": {
                                            "id": "carousel-item1",
                                            "style": "min-width:80px; height:80px; border-radius:8px; background: url('https://v3.fal.media/files/lion/R66RwjYcREqTxK0WwinPl.png') no-repeat center center; background-size:cover; margin-right:8px;"
                                        }
                                    },
                                    {
                                        "type": "div",
                                        "attributes": {
                                            "id": "carousel-item2",
                                            "style": "min-width:80px; height:80px; border-radius:8px; background: url('https://v3.fal.media/files/penguin/Y6VlPIBJ5mxjt2DFtidJe.png') no-repeat center center; background-size:cover; margin-right:8px;"
                                        }
                                    },
                                    {
                                        "type": "div",
                                        "attributes": {
                                            "id": "carousel-item3",
                                            "style": "min-width:80px; height:80px; border-radius:8px; background: url('https://v3.fal.media/files/monkey/8r64qAm_cZFY7Vn508MSe.png') no-repeat center center; background-size:cover;"
                                        }
                                    }
                                ],
                                "attributes": {
                                    "id": "carousel-container",
                                    "style": "display:flex; overflow-x:auto; margin-bottom:15px; padding-bottom:10px; scrollbar-width: thin; scrollbar-color: transparent transparent;"
                                }
                            },
                            {
                                "type": "p",
                                "content": [
                                    "Control every detail of your brew, just the way you like it."
                                ],
                                "attributes": {
                                    "id": "customization-text",
                                    "style": "font-family:'Helvetica', sans-serif; font-size:14px; color:#4e342e; margin-bottom:20px;"
                                }
                            },
                            {
                                "type": "div",
                                "content": [
                                    {
                                        "type": "button",
                                        "content": [
                                            "Back"
                                        ],
                                        "attributes": {
                                            "id": "back-btn2",
                                            "style": "background:#a1887f; color:#fff; border:none; padding:8px 12px; border-radius:5px; font-family:'Helvetica', sans-serif; box-shadow:0 2px 4px rgba(0,0,0,0.2);"
                                        }
                                    },
                                    {
                                        "type": "button",
                                        "content": [
                                            "Next"
                                        ],
                                        "attributes": {
                                            "id": "next-btn2",
                                            "style": "background:#6d4c41; color:#fff; border:none; padding:8px 12px; border-radius:5px; font-family:'Helvetica', sans-serif; box-shadow:0 2px 4px rgba(0,0,0,0.2);"
                                        }
                                    }
                                ],
                                "attributes": {
                                    "id": "onboarding2-buttons",
                                    "style": "display:flex; justify-content:space-between;"
                                }
                            }
                        ],
                        "attributes": {
                            "id": "customization-card",
                            "style": "background:rgba(255,255,255,0.9); border-radius:10px; padding:20px; width:90%; max-width:300px; text-align:center; box-shadow:0 2px 8px rgba(0,0,0,0.1);"
                        }
                    }
                ],
                "attributes": {
                    "id": "onboarding2-container",
                    "style": "width:320px; min-height:600px; background:linear-gradient(135deg, #f3e2c7, #deb887); display:flex; align-items:center; justify-content:center; padding:20px;"
                }
            }
        },
        {
            "screen": {
                "name": "Onboarding Screen 3 - Rewards",
                "width": 320,
                "height": 600
            },
            "component": {
                "type": "div",
                "content": [
                    {
                        "type": "div",
                        "content": [
                            {
                                "type": "h2",
                                "content": [
                                    "Sip & Earn"
                                ],
                                "attributes": {
                                    "id": "rewards-title",
                                    "style": "font-family:'Georgia', serif; font-size:22px; color:#5d4037; margin-bottom:15px;"
                                }
                            },
                            {
                                "type": "div",
                                "attributes": {
                                    "id": "rewards-image",
                                    "style": "width:100%; height:150px; background: url('https://v3.fal.media/files/penguin/Y6VlPIBJ5mxjt2DFtidJe.png') no-repeat center center; background-size:cover; border-radius:8px; margin-bottom:15px;"
                                }
                            },
                            {
                                "type": "p",
                                "content": [
                                    "Earn points every time you order. Get free drinks and special treats!"
                                ],
                                "attributes": {
                                    "id": "rewards-text",
                                    "style": "font-family:'Helvetica', sans-serif; font-size:14px; color:#4e342e; margin-bottom:20px;"
                                }
                            },
                            {
                                "type": "div",
                                "content": [
                                    {
                                        "type": "button",
                                        "content": [
                                            "Back"
                                        ],
                                        "attributes": {
                                            "id": "back-btn3",
                                            "style": "background:#a1887f; color:#fff; border:none; padding:8px 12px; border-radius:5px; font-family:'Helvetica', sans-serif; box-shadow:0 2px 4px rgba(0,0,0,0.2);"
                                        }
                                    },
                                    {
                                        "type": "button",
                                        "content": [
                                            "Get Started"
                                        ],
                                        "attributes": {
                                            "id": "get-started-btn",
                                            "style": "background:#6d4c41; color:#fff; border:none; padding:8px 12px; border-radius:5px; font-family:'Helvetica', sans-serif; box-shadow:0 2px 4px rgba(0,0,0,0.2);"
                                        }
                                    }
                                ],
                                "attributes": {
                                    "id": "onboarding3-buttons",
                                    "style": "display:flex; justify-content:space-between;"
                                }
                            }
                        ],
                        "attributes": {
                            "id": "rewards-card",
                            "style": "background:rgba(255,255,255,0.9); border-radius:10px; padding:20px; width:90%; max-width:300px; text-align:center; box-shadow:0 2px 8px rgba(0,0,0,0.1);"
                        }
                    }
                ],
                "attributes": {
                    "id": "onboarding3-container",
                    "style": "width:320px; min-height:600px; background:linear-gradient(135deg, #f3e2c7, #deb887); display:flex; align-items:center; justify-content:center; padding:20px;"
                }
            }
        },
        {
            "screen": {
                "name": "Home Screen",
                "width": 320,
                "height": 700
            },
            "component": {
                "type": "div",
                "content": [
                    {
                        "type": "div",
                        "content": [
                            {
                                "type": "span",
                                "content": [
                                    "Good Morning, Alex"
                                ],
                                "attributes": {
                                    "id": "greeting-text",
                                    "style": "font-size:16px;"
                                }
                            },
                            {
                                "type": "span",
                                "content": [
                                    "🛒"
                                ],
                                "attributes": {
                                    "id": "cart-icon",
                                    "style": "font-size:18px;"
                                }
                            }
                        ],
                        "attributes": {
                            "id": "app-bar",
                            "style": "display:flex; justify-content:space-between; align-items:center; padding:15px; background:#6d4c41; color:#fff; border-bottom:1px solid rgba(0,0,0,0.1);"
                        }
                    },
                    {
                        "type": "div",
                        "content": [
                            {
                                "type": "div",
                                "content": [
                                    {
                                        "type": "div",
                                        "attributes": {
                                            "id": "coffee-banner",
                                            "style": "width:100%; height:180px; background: url('https://v3.fal.media/files/monkey/8r64qAm_cZFY7Vn508MSe.png') no-repeat center center; background-size:cover;"
                                        }
                                    },
                                    {
                                        "type": "div",
                                        "content": [
                                            {
                                                "type": "h3",
                                                "content": [
                                                    "Caramel Macchiato"
                                                ],
                                                "attributes": {
                                                    "id": "coffee-name",
                                                    "style": "font-family:'Georgia', serif; color:#5d4037; margin:5px 0;"
                                                }
                                            },
                                            {
                                                "type": "p",
                                                "content": [
                                                    "A perfect blend of sweet and bold."
                                                ],
                                                "attributes": {
                                                    "id": "promo-text",
                                                    "style": "font-size:14px; color:#4e342e; margin:5px 0;"
                                                }
                                            },
                                            {
                                                "type": "button",
                                                "content": [
                                                    "Order Now"
                                                ],
                                                "attributes": {
                                                    "id": "order-now-btn",
                                                    "style": "background:#a1887f; color:#fff; border:none; padding:8px 12px; border-radius:5px; font-size:14px; box-shadow:0 2px 4px rgba(0,0,0,0.2);"
                                                }
                                            }
                                        ],
                                        "attributes": {
                                            "id": "coffee-info",
                                            "style": "padding:10px; text-align:center;"
                                        }
                                    }
                                ],
                                "attributes": {
                                    "id": "coffee-of-day-card",
                                    "style": "position:relative; border-radius:10px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.1);"
                                }
                            }
                        ],
                        "attributes": {
                            "id": "hero-section",
                            "style": "padding:15px;"
                        }
                    },
                    {
                        "type": "div",
                        "content": [
                            {
                                "type": "button",
                                "content": [
                                    "Espresso"
                                ],
                                "attributes": {
                                    "id": "cat-espresso",
                                    "style": "background:#deb887; color:#fff; border:none; padding:8px 12px; border-radius:20px; margin-right:8px; font-size:12px;"
                                }
                            },
                            {
                                "type": "button",
                                "content": [
                                    "Cold Brew"
                                ],
                                "attributes": {
                                    "id": "cat-coldbrew",
                                    "style": "background:#deb887; color:#fff; border:none; padding:8px 12px; border-radius:20px; margin-right:8px; font-size:12px;"
                                }
                            },
                            {
                                "type": "button",
                                "content": [
                                    "Frappé"
                                ],
                                "attributes": {
                                    "id": "cat-frappe",
                                    "style": "background:#deb887; color:#fff; border:none; padding:8px 12px; border-radius:20px; margin-right:8px; font-size:12px;"
                                }
                            }
                        ],
                        "attributes": {
                            "id": "category-nav",
                            "style": "padding:15px; overflow-x:auto; white-space:nowrap; margin-bottom:15px; scrollbar-width: thin; scrollbar-color: transparent transparent;"
                        }
                    },
                    {
                        "type": "div",
                        "content": [
                            {
                                "type": "div",
                                "content": [
                                    {
                                        "type": "div",
                                        "attributes": {
                                            "id": "tile1-image",
                                            "style": "width:100%; height:80px; background: url('https://v3.fal.media/files/lion/R66RwjYcREqTxK0WwinPl.png') no-repeat center center; background-size:cover; border-radius:5px;"
                                        }
                                    },
                                    {
                                        "type": "h4",
                                        "content": [
                                            "Latte"
                                        ],
                                        "attributes": {
                                            "id": "tile1-name",
                                            "style": "font-size:14px; margin:5px 0; color:#5d4037;"
                                        }
                                    },
                                    {
                                        "type": "p",
                                        "content": [
                                            "$4.50"
                                        ],
                                        "attributes": {
                                            "id": "tile1-price",
                                            "style": "font-size:12px; color:#4e342e; margin:2px 0;"
                                        }
                                    },
                                    {
                                        "type": "span",
                                        "content": [
                                            "＋"
                                        ],
                                        "attributes": {
                                            "id": "tile1-add",
                                            "style": "font-size:16px; cursor:pointer;"
                                        }
                                    }
                                ],
                                "attributes": {
                                    "id": "drink-tile1",
                                    "style": "background:#fff; border:1px solid #eee; border-radius:8px; padding:10px; text-align:center; box-shadow:0 1px 3px rgba(0,0,0,0.1);"
                                }
                            },
                            {
                                "type": "div",
                                "content": [
                                    {
                                        "type": "div",
                                        "attributes": {
                                            "id": "tile2-image",
                                            "style": "width:100%; height:80px; background: url('https://v3.fal.media/files/panda/jyUmDO2hDda3dH9VhyUTA.png') no-repeat center center; background-size:cover; border-radius:5px;"
                                        }
                                    },
                                    {
                                        "type": "h4",
                                        "content": [
                                            "Cappuccino"
                                        ],
                                        "attributes": {
                                            "id": "tile2-name",
                                            "style": "font-size:14px; margin:5px 0; color:#5d4037;"
                                        }
                                    },
                                    {
                                        "type": "p",
                                        "content": [
                                            "$4.00"
                                        ],
                                        "attributes": {
                                            "id": "tile2-price",
                                            "style": "font-size:12px; color:#4e342e; margin:2px 0;"
                                        }
                                    },
                                    {
                                        "type": "span",
                                        "content": [
                                            "＋"
                                        ],
                                        "attributes": {
                                            "id": "tile2-add",
                                            "style": "font-size:16px; cursor:pointer;"
                                        }
                                    }
                                ],
                                "attributes": {
                                    "id": "drink-tile2",
                                    "style": "background:#fff; border:1px solid #eee; border-radius:8px; padding:10px; text-align:center; box-shadow:0 1px 3px rgba(0,0,0,0.1);"
                                }
                            },
                            {
                                "type": "div",
                                "content": [
                                    {
                                        "type": "div",
                                        "attributes": {
                                            "id": "tile3-image",
                                            "style": "width:100%; height:80px; background: url('https://v3.fal.media/files/penguin/Y6VlPIBJ5mxjt2DFtidJe.png') no-repeat center center; background-size:cover; border-radius:5px;"
                                        }
                                    },
                                    {
                                        "type": "h4",
                                        "content": [
                                            "Mocha"
                                        ],
                                        "attributes": {
                                            "id": "tile3-name",
                                            "style": "font-size:14px; margin:5px 0; color:#5d4037;"
                                        }
                                    },
                                    {
                                        "type": "p",
                                        "content": [
                                            "$4.75"
                                        ],
                                        "attributes": {
                                            "id": "tile3-price",
                                            "style": "font-size:12px; color:#4e342e; margin:2px 0;"
                                        }
                                    },
                                    {
                                        "type": "span",
                                        "content": [
                                            "＋"
                                        ],
                                        "attributes": {
                                            "id": "tile3-add",
                                            "style": "font-size:16px; cursor:pointer;"
                                        }
                                    }
                                ],
                                "attributes": {
                                    "id": "drink-tile3",
                                    "style": "background:#fff; border:1px solid #eee; border-radius:8px; padding:10px; text-align:center; box-shadow:0 1px 3px rgba(0,0,0,0.1);"
                                }
                            },
                            {
                                "type": "div",
                                "content": [
                                    {
                                        "type": "div",
                                        "attributes": {
                                            "id": "tile4-image",
                                            "style": "width:100%; height:80px; background: url('https://v3.fal.media/files/monkey/8r64qAm_cZFY7Vn508MSe.png') no-repeat center center; background-size:cover; border-radius:5px;"
                                        }
                                    },
                                    {
                                        "type": "h4",
                                        "content": [
                                            "Espresso"
                                        ],
                                        "attributes": {
                                            "id": "tile4-name",
                                            "style": "font-size:14px; margin:5px 0; color:#5d4037;"
                                        }
                                    },
                                    {
                                        "type": "p",
                                        "content": [
                                            "$3.00"
                                        ],
                                        "attributes": {
                                            "id": "tile4-price",
                                            "style": "font-size:12px; color:#4e342e; margin:2px 0;"
                                        }
                                    },
                                    {
                                        "type": "span",
                                        "content": [
                                            "＋"
                                        ],
                                        "attributes": {
                                            "id": "tile4-add",
                                            "style": "font-size:16px; cursor:pointer;"
                                        }
                                    }
                                ],
                                "attributes": {
                                    "id": "drink-tile4",
                                    "style": "background:#fff; border:1px solid #eee; border-radius:8px; padding:10px; text-align:center; box-shadow:0 1px 3px rgba(0,0,0,0.1);"
                                }
                            }
                        ],
                        "attributes": {
                            "id": "popular-grid",
                            "style": "display:grid; grid-template-columns:repeat(2,1fr); gap:10px; padding:0 15px;"
                        }
                    }
                ],
                "attributes": {
                    "id": "home-screen-container",
                    "style": "width:320px; min-height:700px; background:#fffaf0; font-family:'Helvetica', sans-serif; padding-bottom:20px; overflow-y:auto;"
                }
            }
        },
        {
            "screen": {
                "name": "Menu Screen",
                "width": 320,
                "height": 650
            },
            "component": {
                "type": "div",
                "content": [
                    {
                        "type": "div",
                        "content": [
                            {
                                "type": "button",
                                "content": [
                                    "Hot"
                                ],
                                "attributes": {
                                    "id": "seg-hot",
                                    "style": "background:#6d4c41; color:#fff; border:none; padding:8px 12px; border-radius:20px; font-size:12px;"
                                }
                            },
                            {
                                "type": "button",
                                "content": [
                                    "Cold"
                                ],
                                "attributes": {
                                    "id": "seg-cold",
                                    "style": "background:#a1887f; color:#fff; border:none; padding:8px 12px; border-radius:20px; font-size:12px;"
                                }
                            },
                            {
                                "type": "button",
                                "content": [
                                    "Snacks"
                                ],
                                "attributes": {
                                    "id": "seg-snacks",
                                    "style": "background:#a1887f; color:#fff; border:none; padding:8px 12px; border-radius:20px; font-size:12px;"
                                }
                            },
                            {
                                "type": "button",
                                "content": [
                                    "Seasonal"
                                ],
                                "attributes": {
                                    "id": "seg-seasonal",
                                    "style": "background:#a1887f; color:#fff; border:none; padding:8px 12px; border-radius:20px; font-size:12px;"
                                }
                            }
                        ],
                        "attributes": {
                            "id": "segmented-controller",
                            "style": "display:flex; justify-content:space-around; margin-bottom:15px;"
                        }
                    },
                    {
                        "type": "div",
                        "content": [
                            {
                                "type": "div",
                                "content": [
                                    {
                                        "type": "div",
                                        "attributes": {
                                            "id": "menu-thumb1",
                                            "style": "width:60px; height:60px; background: url('https://v3.fal.media/files/panda/jyUmDO2hDda3dH9VhyUTA.png') no-repeat center center; background-size:cover; border-radius:5px; margin-right:10px;"
                                        }
                                    },
                                    {
                                        "type": "div",
                                        "content": [
                                            {
                                                "type": "h4",
                                                "content": [
                                                    "Espresso"
                                                ],
                                                "attributes": {
                                                    "id": "menu-item-name1",
                                                    "style": "font-size:14px; color:#5d4037; margin:2px 0; cursor:pointer;"
                                                }
                                            },
                                            {
                                                "type": "p",
                                                "content": [
                                                    "Strong and bold flavor."
                                                ],
                                                "attributes": {
                                                    "id": "menu-item-desc1",
                                                    "style": "font-size:12px; color:#4e342e; margin:2px 0;"
                                                }
                                            },
                                            {
                                                "type": "p",
                                                "content": [
                                                    "$3.00"
                                                ],
                                                "attributes": {
                                                    "id": "menu-item-price1",
                                                    "style": "font-size:12px; color:#4e342e; margin:2px 0;"
                                                }
                                            }
                                        ],
                                        "attributes": {
                                            "id": "menu-info1",
                                            "style": "flex:1;"
                                        }
                                    },
                                    {
                                        "type": "button",
                                        "content": [
                                            "Add"
                                        ],
                                        "attributes": {
                                            "id": "add-cart1",
                                            "style": "background:#6d4c41; color:#fff; border:none; padding:6px 10px; border-radius:5px; font-size:12px;"
                                        }
                                    }
                                ],
                                "attributes": {
                                    "id": "menu-card1",
                                    "style": "display:flex; align-items:center; border:1px solid #eee; padding:10px; border-radius:8px; box-shadow:0 1px 3px rgba(0,0,0,0.1);"
                                }
                            },
                            {
                                "type": "div",
                                "content": [
                                    {
                                        "type": "div",
                                        "attributes": {
                                            "id": "menu-thumb2",
                                            "style": "width:60px; height:60px; background: url('https://v3.fal.media/files/monkey/8r64qAm_cZFY7Vn508MSe.png') no-repeat center center; background-size:cover; border-radius:5px; margin-right:10px;"
                                        }
                                    },
                                    {
                                        "type": "div",
                                        "content": [
                                            {
                                                "type": "h4",
                                                "content": [
                                                    "Cappuccino"
                                                ],
                                                "attributes": {
                                                    "id": "menu-item-name2",
                                                    "style": "font-size:14px; color:#5d4037; margin:2px 0; cursor:pointer;"
                                                }
                                            },
                                            {
                                                "type": "p",
                                                "content": [
                                                    "Creamy and frothy."
                                                ],
                                                "attributes": {
                                                    "id": "menu-item-desc2",
                                                    "style": "font-size:12px; color:#4e342e; margin:2px 0;"
                                                }
                                            },
                                            {
                                                "type": "p",
                                                "content": [
                                                    "$4.00"
                                                ],
                                                "attributes": {
                                                    "id": "menu-item-price2",
                                                    "style": "font-size:12px; color:#4e342e; margin:2px 0;"
                                                }
                                            }
                                        ],
                                        "attributes": {
                                            "id": "menu-info2",
                                            "style": "flex:1;"
                                        }
                                    },
                                    {
                                        "type": "button",
                                        "content": [
                                            "Add"
                                        ],
                                        "attributes": {
                                            "id": "add-cart2",
                                            "style": "background:#6d4c41; color:#fff; border:none; padding:6px 10px; border-radius:5px; font-size:12px;"
                                        }
                                    }
                                ],
                                "attributes": {
                                    "id": "menu-card2",
                                    "style": "display:flex; align-items:center; border:1px solid #eee; padding:10px; border-radius:8px; box-shadow:0 1px 3px rgba(0,0,0,0.1);"
                                }
                            }
                        ],
                        "attributes": {
                            "id": "menu-list",
                            "style": "display:flex; flex-direction:column; gap:10px;"
                        }
                    }
                ],
                "attributes": {
                    "id": "menu-screen-container",
                    "style": "width:320px; min-height:650px; background:#fffaf0; font-family:'Helvetica', sans-serif; padding:15px; overflow-y:auto;"
                }
            }
        },
        {
            "screen": {
                "name": "Drink Detail Screen",
                "width": 320,
                "height": 700
            },
            "component": {
                "type": "div",
                "content": [
                    {
                        "type": "div",
                        "attributes": {
                            "id": "drink-banner",
                            "style": "width:100%; height:200px; background: url('https://v3.fal.media/files/penguin/Y6VlPIBJ5mxjt2DFtidJe.png') no-repeat center center; background-size:cover;"
                        }
                    },
                    {
                        "type": "div",
                        "content": [
                            {
                                "type": "h2",
                                "content": [
                                    "Caramel Macchiato"
                                ],
                                "attributes": {
                                    "id": "drink-name",
                                    "style": "font-family:'Georgia', serif; font-size:22px; color:#5d4037; margin-bottom:10px;"
                                }
                            },
                            {
                                "type": "div",
                                "content": [
                                    "★★★★★"
                                ],
                                "attributes": {
                                    "id": "star-rating",
                                    "style": "margin-bottom:5px; color:#ffa000;"
                                }
                            },
                            {
                                "type": "p",
                                "content": [
                                    "(124 Reviews)"
                                ],
                                "attributes": {
                                    "id": "review-count",
                                    "style": "font-size:12px; color:#4e342e; margin-bottom:10px;"
                                }
                            },
                            {
                                "type": "p",
                                "content": [
                                    "A rich blend of espresso with velvety milk, topped with caramel drizzle."
                                ],
                                "attributes": {
                                    "id": "drink-description",
                                    "style": "font-size:14px; color:#4e342e; margin-bottom:10px;"
                                }
                            },
                            {
                                "type": "p",
                                "content": [
                                    "$4.75"
                                ],
                                "attributes": {
                                    "id": "drink-price",
                                    "style": "font-size:16px; color:#5d4037; margin-bottom:20px;"
                                }
                            },
                            {
                                "type": "div",
                                "content": [
                                    " ",
                                    {
                                        "type": "div",
                                        "content": [
                                            {
                                                "type": "p",
                                                "content": [
                                                    "Select Size:"
                                                ],
                                                "attributes": {
                                                    "style": "font-size:14px; color:#5d4037; margin-bottom:5px;"
                                                }
                                            },
                                            {
                                                "type": "button",
                                                "content": [
                                                    "Small"
                                                ],
                                                "attributes": {
                                                    "id": "size-small",
                                                    "style": "background:#a1887f; color:#fff; border:none; padding:6px 10px; border-radius:5px; margin-right:5px;"
                                                }
                                            },
                                            {
                                                "type": "button",
                                                "content": [
                                                    "Medium"
                                                ],
                                                "attributes": {
                                                    "id": "size-medium",
                                                    "style": "background:#a1887f; color:#fff; border:none; padding:6px 10px; border-radius:5px; margin-right:5px;"
                                                }
                                            },
                                            {
                                                "type": "button",
                                                "content": [
                                                    "Large"
                                                ],
                                                "attributes": {
                                                    "id": "size-large",
                                                    "style": "background:#a1887f; color:#fff; border:none; padding:6px 10px; border-radius:5px;"
                                                }
                                            }
                                        ],
                                        "attributes": {
                                            "id": "size-options",
                                            "style": "margin-bottom:10px;"
                                        }
                                    },
                                    " ",
                                    {
                                        "type": "div",
                                        "content": [
                                            {
                                                "type": "p",
                                                "content": [
                                                    "Milk Type:"
                                                ],
                                                "attributes": {
                                                    "style": "font-size:14px; color:#5d4037; margin-bottom:5px;"
                                                }
                                            },
                                            {
                                                "type": "button",
                                                "content": [
                                                    "Regular"
                                                ],
                                                "attributes": {
                                                    "id": "milk-regular",
                                                    "style": "background:#deb887; color:#fff; border:none; padding:6px 10px; border-radius:5px; margin-right:5px;"
                                                }
                                            },
                                            {
                                                "type": "button",
                                                "content": [
                                                    "Oat Milk"
                                                ],
                                                "attributes": {
                                                    "id": "milk-oat",
                                                    "style": "background:#deb887; color:#fff; border:none; padding:6px 10px; border-radius:5px;"
                                                }
                                            }
                                        ],
                                        "attributes": {
                                            "id": "milk-options",
                                            "style": "margin-bottom:10px;"
                                        }
                                    },
                                    " ",
                                    {
                                        "type": "div",
                                        "content": [
                                            {
                                                "type": "p",
                                                "content": [
                                                    "Sweetness:"
                                                ],
                                                "attributes": {
                                                    "style": "font-size:14px; color:#5d4037; margin-bottom:5px;"
                                                }
                                            },
                                            {
                                                "type": "button",
                                                "content": [
                                                    "No Sugar"
                                                ],
                                                "attributes": {
                                                    "id": "sweet-no",
                                                    "style": "background:#a1887f; color:#fff; border:none; padding:6px 10px; border-radius:5px; margin-right:5px;"
                                                }
                                            },
                                            {
                                                "type": "button",
                                                "content": [
                                                    "Less Sugar"
                                                ],
                                                "attributes": {
                                                    "id": "sweet-yes",
                                                    "style": "background:#a1887f; color:#fff; border:none; padding:6px 10px; border-radius:5px;"
                                                }
                                            }
                                        ],
                                        "attributes": {
                                            "id": "sweetness-options",
                                            "style": "margin-bottom:10px;"
                                        }
                                    },
                                    " ",
                                    {
                                        "type": "div",
                                        "content": [
                                            {
                                                "type": "p",
                                                "content": [
                                                    "Toppings:"
                                                ],
                                                "attributes": {
                                                    "style": "font-size:14px; color:#5d4037; margin-bottom:5px;"
                                                }
                                            },
                                            {
                                                "type": "label",
                                                "content": [
                                                    {
                                                        "type": "input",
                                                        "attributes": {
                                                            "type": "checkbox",
                                                            "id": "topping-whipped",
                                                            "style": "margin-right:3px;"
                                                        }
                                                    },
                                                    "Whipped Cream"
                                                ],
                                                "attributes": {
                                                    "style": "font-size:12px; color:#4e342e; margin-right:10px;"
                                                }
                                            },
                                            {
                                                "type": "label",
                                                "content": [
                                                    {
                                                        "type": "input",
                                                        "attributes": {
                                                            "type": "checkbox",
                                                            "id": "topping-cinnamon",
                                                            "style": "margin-right:3px;"
                                                        }
                                                    },
                                                    "Cinnamon"
                                                ],
                                                "attributes": {
                                                    "style": "font-size:12px; color:#4e342e;"
                                                }
                                            }
                                        ],
                                        "attributes": {
                                            "id": "toppings-options"
                                        }
                                    }
                                ],
                                "attributes": {
                                    "id": "customizer-options",
                                    "style": "animation:slideIn 0.5s ease-in-out;"
                                }
                            }
                        ],
                        "attributes": {
                            "id": "drink-details",
                            "style": "padding:15px;"
                        }
                    },
                    {
                        "type": "button",
                        "content": [
                            "Add to Cart"
                        ],
                        "attributes": {
                            "id": "add-to-cart-btn",
                            "style": "background:#6d4c41; color:#fff; border:none; padding:12px; width:90%; margin:15px auto; display:block; border-radius:5px; font-size:16px; box-shadow:0 2px 4px rgba(0,0,0,0.2);"
                        }
                    }
                ],
                "attributes": {
                    "id": "drink-detail-container",
                    "style": "width:320px; min-height:700px; background:#fffaf0; font-family:'Helvetica', sans-serif; overflow-y:auto; padding-bottom:20px;"
                }
            }
        },
        {
            "screen": {
                "name": "Cart Screen",
                "width": 320,
                "height": 650
            },
            "component": {
                "type": "div",
                "content": [
                    {
                        "type": "div",
                        "content": [
                            "Your Cart"
                        ],
                        "attributes": {
                            "id": "cart-app-bar",
                            "style": "padding:15px; background:#6d4c41; color:#fff; text-align:center; font-size:18px; border-bottom:1px solid rgba(0,0,0,0.1);"
                        }
                    },
                    {
                        "type": "div",
                        "content": [
                            {
                                "type": "div",
                                "content": [
                                    {
                                        "type": "div",
                                        "attributes": {
                                            "id": "cart-thumb1",
                                            "style": "width:60px; height:60px; background: url('https://v3.fal.media/files/lion/R66RwjYcREqTxK0WwinPl.png') no-repeat center center; background-size:cover; border-radius:5px; margin-right:10px;"
                                        }
                                    },
                                    {
                                        "type": "div",
                                        "content": [
                                            {
                                                "type": "h4",
                                                "content": [
                                                    "Espresso"
                                                ],
                                                "attributes": {
                                                    "id": "cart-item-name1",
                                                    "style": "font-size:14px; color:#5d4037; margin:2px 0;"
                                                }
                                            },
                                            {
                                                "type": "p",
                                                "content": [
                                                    "Oat Milk, No Sugar"
                                                ],
                                                "attributes": {
                                                    "id": "cart-custom-tags1",
                                                    "style": "font-size:12px; color:#4e342e; margin:2px 0;"
                                                }
                                            },
                                            {
                                                "type": "p",
                                                "content": [
                                                    "$3.00"
                                                ],
                                                "attributes": {
                                                    "id": "cart-price1",
                                                    "style": "font-size:12px; color:#4e342e; margin:2px 0;"
                                                }
                                            }
                                        ],
                                        "attributes": {
                                            "id": "cart-info1",
                                            "style": "flex:1;"
                                        }
                                    },
                                    {
                                        "type": "div",
                                        "content": [
                                            {
                                                "type": "button",
                                                "content": [
                                                    "+"
                                                ],
                                                "attributes": {
                                                    "id": "qty-plus1",
                                                    "style": "background:#6d4c41; color:#fff; border:none; padding:4px; border-radius:3px; margin-bottom:3px;"
                                                }
                                            },
                                            {
                                                "type": "span",
                                                "content": [
                                                    "1"
                                                ],
                                                "attributes": {
                                                    "id": "qty-number1",
                                                    "style": "font-size:14px;"
                                                }
                                            },
                                            {
                                                "type": "button",
                                                "content": [
                                                    "-"
                                                ],
                                                "attributes": {
                                                    "id": "qty-minus1",
                                                    "style": "background:#6d4c41; color:#fff; border:none; padding:4px; border-radius:3px; margin-top:3px;"
                                                }
                                            }
                                        ],
                                        "attributes": {
                                            "id": "quantity-controller1",
                                            "style": "display:flex; flex-direction:column; align-items:center;"
                                        }
                                    }
                                ],
                                "attributes": {
                                    "id": "cart-item1",
                                    "style": "display:flex; align-items:center; border:1px solid #eee; padding:10px; border-radius:8px; box-shadow:0 1px 3px rgba(0,0,0,0.1);"
                                }
                            }
                        ],
                        "attributes": {
                            "id": "cart-items",
                            "style": "padding:15px; display:flex; flex-direction:column; gap:10px;"
                        }
                    },
                    {
                        "type": "div",
                        "content": [
                            {
                                "type": "p",
                                "content": [
                                    "Subtotal: $3.00"
                                ],
                                "attributes": {
                                    "id": "subtotal",
                                    "style": "font-size:14px; color:#4e342e; margin:2px 0;"
                                }
                            },
                            {
                                "type": "p",
                                "content": [
                                    "Tax: $0.27"
                                ],
                                "attributes": {
                                    "id": "tax",
                                    "style": "font-size:14px; color:#4e342e; margin:2px 0;"
                                }
                            },
                            {
                                "type": "p",
                                "content": [
                                    "Total: $3.27"
                                ],
                                "attributes": {
                                    "id": "total",
                                    "style": "font-size:16px; color:#5d4037; margin:2px 0; font-weight:bold;"
                                }
                            }
                        ],
                        "attributes": {
                            "id": "cart-summary",
                            "style": "padding:15px; border-top:1px solid #eee;"
                        }
                    },
                    {
                        "type": "button",
                        "content": [
                            "Proceed to Checkout"
                        ],
                        "attributes": {
                            "id": "checkout-btn",
                            "style": "background:#6d4c41; color:#fff; border:none; padding:12px; width:90%; margin:15px auto; display:block; border-radius:5px; font-size:16px; box-shadow:0 2px 4px rgba(0,0,0,0.2);"
                        }
                    }
                ],
                "attributes": {
                    "id": "cart-screen-container",
                    "style": "width:320px; min-height:650px; background:#fffaf0; font-family:'Helvetica', sans-serif; overflow-y:auto; padding-bottom:20px;"
                }
            }
        },
        {
            "screen": {
                "name": "Profile/Account Screen",
                "width": 320,
                "height": 700
            },
            "component": {
                "type": "div",
                "content": [
                    {
                        "type": "div",
                        "content": [
                            {
                                "type": "div",
                                "attributes": {
                                    "id": "avatar-placeholder",
                                    "style": "width:60px; height:60px; border-radius:50%; background:#deb887; margin-right:15px;"
                                }
                            },
                            {
                                "type": "div",
                                "content": [
                                    {
                                        "type": "h3",
                                        "content": [
                                            "Alex"
                                        ],
                                        "attributes": {
                                            "id": "user-name",
                                            "style": "font-family:'Georgia', serif; font-size:18px; color:#5d4037; margin:2px 0;"
                                        }
                                    },
                                    {
                                        "type": "button",
                                        "content": [
                                            "Edit Profile"
                                        ],
                                        "attributes": {
                                            "id": "edit-profile-btn",
                                            "style": "background:#6d4c41; color:#fff; border:none; padding:6px 10px; border-radius:5px; font-size:12px;"
                                        }
                                    }
                                ],
                                "attributes": {
                                    "id": "profile-info",
                                    "style": "flex:1;"
                                }
                            }
                        ],
                        "attributes": {
                            "id": "profile-card",
                            "style": "background:#fff; border-radius:10px; padding:15px; box-shadow:0 2px 8px rgba(0,0,0,0.1); display:flex; align-items:center; margin-bottom:15px;"
                        }
                    },
                    {
                        "type": "div",
                        "content": [
                            {
                                "type": "h4",
                                "content": [
                                    "Order History"
                                ],
                                "attributes": {
                                    "id": "order-history-title",
                                    "style": "font-family:'Georgia', serif; font-size:16px; color:#5d4037; margin-bottom:8px;"
                                }
                            },
                            {
                                "type": "div",
                                "content": [
                                    "Latte - $4.50"
                                ],
                                "attributes": {
                                    "id": "order-item1",
                                    "style": "border-bottom:1px solid #eee; padding:8px 0; font-size:12px; color:#4e342e;"
                                }
                            },
                            {
                                "type": "div",
                                "content": [
                                    "Cappuccino - $4.00"
                                ],
                                "attributes": {
                                    "id": "order-item2",
                                    "style": "border-bottom:1px solid #eee; padding:8px 0; font-size:12px; color:#4e342e;"
                                }
                            }
                        ],
                        "attributes": {
                            "id": "order-history",
                            "style": "margin-bottom:15px;"
                        }
                    },
                    {
                        "type": "div",
                        "content": [
                            {
                                "type": "h4",
                                "content": [
                                    "Loyalty Points"
                                ],
                                "attributes": {
                                    "id": "loyalty-title",
                                    "style": "font-family:'Georgia', serif; font-size:16px; color:#5d4037; margin-bottom:5px;"
                                }
                            },
                            {
                                "type": "div",
                                "content": [
                                    "150"
                                ],
                                "attributes": {
                                    "id": "points-counter",
                                    "style": "font-size:24px; color:#6d4c41; animation:countUp 2s linear;"
                                }
                            }
                        ],
                        "attributes": {
                            "id": "loyalty-points",
                            "style": "margin-bottom:15px; text-align:center; padding:10px; background:#fff; border-radius:10px; box-shadow:0 2px 8px rgba(0,0,0,0.1);"
                        }
                    },
                    {
                        "type": "div",
                        "content": [
                            {
                                "type": "h4",
                                "content": [
                                    "Settings"
                                ],
                                "attributes": {
                                    "id": "settings-title",
                                    "style": "font-family:'Georgia', serif; font-size:16px; color:#5d4037; margin-bottom:10px;"
                                }
                            },
                            {
                                "type": "div",
                                "content": [
                                    {
                                        "type": "span",
                                        "content": [
                                            "Notifications"
                                        ],
                                        "attributes": {
                                            "style": "font-size:14px; color:#4e342e;"
                                        }
                                    },
                                    {
                                        "type": "span",
                                        "content": [
                                            "➡"
                                        ]
                                    }
                                ],
                                "attributes": {
                                    "id": "setting-notifications",
                                    "style": "display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid #eee;"
                                }
                            },
                            {
                                "type": "div",
                                "content": [
                                    {
                                        "type": "span",
                                        "content": [
                                            "Payment"
                                        ],
                                        "attributes": {
                                            "style": "font-size:14px; color:#4e342e;"
                                        }
                                    },
                                    {
                                        "type": "span",
                                        "content": [
                                            "➡"
                                        ]
                                    }
                                ],
                                "attributes": {
                                    "id": "setting-payment",
                                    "style": "display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid #eee;"
                                }
                            },
                            {
                                "type": "div",
                                "content": [
                                    {
                                        "type": "span",
                                        "content": [
                                            "Help Center"
                                        ],
                                        "attributes": {
                                            "style": "font-size:14px; color:#4e342e;"
                                        }
                                    },
                                    {
                                        "type": "span",
                                        "content": [
                                            "➡"
                                        ]
                                    }
                                ],
                                "attributes": {
                                    "id": "setting-help",
                                    "style": "display:flex; justify-content:space-between; padding:8px 0;"
                                }
                            }
                        ],
                        "attributes": {
                            "id": "settings-section",
                            "style": "background:#fff; border-radius:10px; padding:15px; box-shadow:0 2px 8px rgba(0,0,0,0.1);"
                        }
                    },
                    {
                        "type": "style",
                        "content": [
                            " @keyframes countUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } } "
                        ]
                    }
                ],
                "attributes": {
                    "id": "profile-screen-container",
                    "style": "width:320px; min-height:700px; background:#fdf6e3; font-family:'Helvetica', sans-serif; padding:15px; overflow-y:auto;"
                }
            }
        }
    ],
    "message": "Splash Screen: A full-screen image of a cozy coffee shop with warm color tones. Centered at the bottom is the app logo (e.g., 'BrewMate') with a smooth fade-in animation. The background has a slight blur overlay to make the logo pop.\n\nOnboarding Screen 1 - Welcome: Warm-themed background with a translucent container card in the center. Top includes 'Welcome to BrewMate' text in bold. Below is an image of a barista handing a coffee cup. Then, a short informative text: 'Discover the best brews in town. Order ahead and skip the line!'. Bottom navigation buttons: 'Skip' (left), 'Next' (right).\n\nOnboarding Screen 2 - Customization: Same layout with top title 'Your Coffee, Your Way'. Below is an image carousel showing customizable coffee (different toppings, milk options, cup sizes). Text: 'Control every detail of your brew, just the way you like it.'. Navigation buttons: 'Back' (left), 'Next' (right).\n\nOnboarding Screen 3 - Rewards: Title at the top saying 'Sip & Earn'. Image of a coffee cup with loyalty points badges and coins. Text: 'Earn points every time you order. Get free drinks and special treats!'. Buttons: 'Back' and 'Get Started'.\n\nHome Screen: Top app bar includes greeting text ('Good Morning, Alex') and a cart icon on the top right. Hero section has a large coffee of the day card with image, name (e.g., 'Caramel Macchiato'), promo text, and 'Order Now' button. Below, a horizontally scrollable category nav (e.g., Espresso, Cold Brew, Frappé). Under that, a grid layout of popular drinks: each tile includes an image, drink name, price, and mini 'Add to cart' icon.\n\nMenu Screen: Uses a segmented controller to switch between 'Hot', 'Cold', 'Snacks', and 'Seasonal'. List layout under each tab with drink/snack card: thumbnail image on left, description and price in center, and add-to-cart button on the right. Option to click into a detail page by tapping the name or image.\n\nDrink Detail Screen: Large image banner of the drink at the top. Below includes: Name, Star Ratings, Number of Reviews, Description, Price. Followed by customizer widgets: select size (Small, Medium, Large), milk type, sweetness, toppings (checkbox group). Button at bottom: 'Add to Cart'. Smooth slide-in animations for customizer options.\n\nCart Screen: Top title bar 'Your Cart'. List of items with image, name, custom tags (e.g., 'Oat Milk, No Sugar'), and price. Quantity controller (+/-) on the right. Below the list, a summary section with subtotal, tax, total. 'Proceed to Checkout' CTA button at the bottom.\n\nProfile/Account Screen: Top card with user's avatar, name, and 'Edit Profile' button. Sections: Order History (list with past orders), Loyalty Points (animated counter), Settings (notifications, payment, help center). Stylish icons and clean divider lines. Background uses subtle light beige palette to match overall coffee tone.\n\nAll screens use a combination of mocha, beige, and deep brown colors to give a premium, cozy feel. Typography is modern—primary heading uses a rounded serif font, while body text uses a clean sans-serif. Buttons have soft shadows and rounded corners. Transitions between screens are smooth and use material motion patterns.",
    "imageHolder": [
        "https://v3.fal.media/files/elephant/Z2_vhHcu4J94RzWhbIELc.png - Image of A cozy coffee shop with warm lighting and wooden textures",
        "https://v3.fal.media/files/lion/R66RwjYcREqTxK0WwinPl.png - Image of A steaming hot coffee in a ceramic cup with foam art on top",
        "https://v3.fal.media/files/panda/jyUmDO2hDda3dH9VhyUTA.png - Image of A steaming hot coffee in a ceramic cup with foam art on top",
        "https://v3.fal.media/files/penguin/Y6VlPIBJ5mxjt2DFtidJe.png - Image of A steaming hot coffee in a ceramic cup with foam art on top",
        "https://v3.fal.media/files/monkey/8r64qAm_cZFY7Vn508MSe.png - Image of A steaming hot coffee in a ceramic cup with foam art on top"
    ]
}