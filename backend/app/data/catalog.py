from typing import Any

# In-memory reference dataset.
CATALOG: dict[str, Any] = {
    "India": {
        "Medical & Health Sciences": {
            "UG": {
                "tuition": 1200000,
                "living_cost": 300000,
                "edu_inflation": 0.08,
                "living_inflation": 0.06,
            },
            "PG": {
                "tuition": 900000,
                "living_cost": 280000,
                "edu_inflation": 0.08,
                "living_inflation": 0.06,
            },
        },
        "Engineering": {
            "UG": {
                "tuition": 1000000,
                "living_cost": 260000,
                "edu_inflation": 0.08,
                "living_inflation": 0.06,
            },
            "PG": {
                "tuition": 850000,
                "living_cost": 250000,
                "edu_inflation": 0.08,
                "living_inflation": 0.06,
            },
        },
    },
    "Canada": {
        "Medical & Health Sciences": {
            "UG": {
                "tuition": 42000,
                "living_cost": 18000,
                "edu_inflation": 0.05,
                "living_inflation": 0.04,
            },
            "PG": {
                "tuition": 36000,
                "living_cost": 17000,
                "edu_inflation": 0.05,
                "living_inflation": 0.04,
            },
        },
        "Business": {
            "UG": {
                "tuition": 32000,
                "living_cost": 16000,
                "edu_inflation": 0.05,
                "living_inflation": 0.04,
            },
            "PG": {
                "tuition": 38000,
                "living_cost": 16500,
                "edu_inflation": 0.05,
                "living_inflation": 0.04,
            },
        },
    },
    "USA": {
        "Medical & Health Sciences": {
            "UG": {
                "tuition": 55000,
                "living_cost": 22000,
                "edu_inflation": 0.055,
                "living_inflation": 0.045,
            },
            "PG": {
                "tuition": 48000,
                "living_cost": 21000,
                "edu_inflation": 0.055,
                "living_inflation": 0.045,
            },
        },
        "Computer Science": {
            "UG": {
                "tuition": 50000,
                "living_cost": 21000,
                "edu_inflation": 0.055,
                "living_inflation": 0.045,
            },
            "PG": {
                "tuition": 46000,
                "living_cost": 20500,
                "edu_inflation": 0.055,
                "living_inflation": 0.045,
            },
        },
    },
    "Ireland": {
        "Medical & Health Sciences": {
            "UG": {
                "tuition": 26000,
                "living_cost": 14000,
                "edu_inflation": 0.05,
                "living_inflation": 0.04,
            },
            "PG": {
                "tuition": 28000,
                "living_cost": 14500,
                "edu_inflation": 0.05,
                "living_inflation": 0.04,
            },
        }
    },
}
