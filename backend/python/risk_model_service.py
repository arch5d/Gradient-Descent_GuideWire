import json
import sys

import numpy as np
from sklearn.linear_model import LinearRegression


def build_training_data():
    """Create a small synthetic training set for MVP risk scoring."""
    x_train = np.array(
        [
            [18, 0.70, 0.22, 0.58],
            [24, 0.75, 0.19, 0.51],
            [30, 0.82, 0.15, 0.42],
            [36, 0.87, 0.10, 0.34],
            [42, 0.90, 0.08, 0.28],
            [48, 0.93, 0.06, 0.20],
            [55, 0.95, 0.04, 0.14],
            [62, 0.97, 0.03, 0.11],
        ]
    )

    y_train = np.array([88, 80, 68, 56, 46, 34, 24, 18])
    return x_train, y_train


def clamp(score):
    return float(max(0, min(100, score)))


def main():
    raw_payload = sys.stdin.read().strip()

    if not raw_payload:
        raise ValueError('No JSON payload was provided to risk_model_service.py')

    payload = json.loads(raw_payload)

    features = np.array(
        [
            [
                float(payload.get('weekly_jobs_completed', 30)),
                float(payload.get('on_time_rate', 0.9)),
                float(payload.get('cancellation_rate', 0.08)),
                float(payload.get('income_volatility', 0.22)),
            ]
        ]
    )

    x_train, y_train = build_training_data()
    model = LinearRegression()
    model.fit(x_train, y_train)

    predicted = model.predict(features)[0]

    result = {
        'riskScore': round(clamp(predicted), 2),
        'modelVersion': 'sklearn-linear-risk-v1',
    }

    print(json.dumps(result))


if __name__ == '__main__':
    try:
        main()
    except Exception as exc:
        sys.stderr.write(str(exc))
        sys.exit(1)
