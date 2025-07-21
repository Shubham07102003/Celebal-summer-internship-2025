import streamlit as st
import pandas as pd
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression, LinearRegression
from sklearn.naive_bayes import GaussianNB
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix, mean_squared_error
import io

# --- App Config & Branding ---
st.set_page_config(page_title="ModelVista - Smart ML Playground", page_icon="🌄", layout="wide")
with st.sidebar:
    st.title("🌄 ModelVista")
    st.image("https://streamlit.io/images/brand/streamlit-logo-primary-colormark-darktext.png", width=140)
    page = st.radio("Navigation", ["Home", "Explore Data", "Playground", "Predict", "About"])
    st.markdown("---")
    st.markdown("**Developed by Shubham for Celebal Internship 2025**")
    st.info("Choose a page to interact!", icon="🤖")

# --------- DATASET & TARGET MAPPING ----------
DATASETS = {
    "Heart Disease": "Dataset/Updated_heart_prediction.csv",
    "Titanic": "Dataset/Preprocessed Titanic Dataset.csv",
    "Salary (Regression)": "Dataset/Salary_dataset.csv",
    "Car Evaluation": "Dataset/car_evaluation.csv",
    "Naive Bayes Demo": "Dataset/Naive-Bayes-Classification-Data.csv"
}
TARGETS = {
    "Heart Disease": "output",
    "Titanic": "survived",
    "Salary (Regression)": "Salary",
    "Car Evaluation": "class",
    "Naive Bayes Demo": "diabetes"
}

@st.cache_data
def load_df(path):
    return pd.read_csv(path)

# --------- UTILITY FUNCTIONS ----------
def encode_features(df, exclude=[]):
    encoders = {}
    for col in df.select_dtypes(include='object'):
        if col not in exclude:
            le = LabelEncoder()
            df[col] = le.fit_transform(df[col].astype(str))
            encoders[col] = le
    return df, encoders

def plot_confusion(cm, labels):
    fig, ax = plt.subplots()
    sns.heatmap(cm, annot=True, fmt="d", cmap="Blues", xticklabels=labels, yticklabels=labels, ax=ax)
    ax.set_xlabel("Predicted"); ax.set_ylabel("Actual")
    st.pyplot(fig)

def show_feature_importances(model, feat_names):
    if hasattr(model, "feature_importances_"):
        importances = model.feature_importances_
        fi_df = pd.DataFrame({"Feature": feat_names, "Importance": importances}).sort_values("Importance")
        st.write("Top Features Driving Prediction")
        st.bar_chart(fi_df.set_index("Feature")["Importance"])

# --------- PAGES ----------
if page == "Home":
    st.title("🌄 ModelVista")
    st.markdown("""
    #### Welcome to ModelVista – explore, tune, and deploy machine learning models interactively!
    - 📊 **Explore Data:** See, search, and visualize features.
    - 🔬 **Playground:** Train & tune models, compare performance.
    - 🎯 **Predict:** Single or batch predictions with detailed feedback and explanations.
    - Built for next-gen assignment showcases: sleek, fast, fun!
    """)
    st.success("Get started via sidebar ⬅️", icon="👉")
    st.markdown("---\n**Pro Tip**: Try batch predictions for CSV uploads!")

elif page == "Explore Data":
    st.header("📊 Data Explorer")
    dataset = st.selectbox("Choose Dataset", DATASETS.keys())
    df = load_df(DATASETS[dataset])
    st.write("#### Dataset Preview")
    st.dataframe(df.head(20))
    st.info(f"Rows: {df.shape[0]}, Columns: {df.shape[1]}", icon="📏")
    st.write("**Descriptive Stats:**")
    st.dataframe(df.describe().T)
    if st.checkbox("Show All Columns"):
        st.write(df.columns.tolist())
    if st.checkbox("Plot Numeric Feature"):
        numcols = df.select_dtypes("number").columns.tolist()
        col = st.selectbox("Pick Feature", numcols)
        fig, ax = plt.subplots()
        sns.histplot(df[col], kde=True, ax=ax)
        st.pyplot(fig)

elif page == "Playground":
    st.header("🛠️ Model Playground & Hyperparameter Tuning")
    dataset = st.selectbox("Dataset", DATASETS.keys())
    df = load_df(DATASETS[dataset])
    target = TARGETS[dataset]
    X = df.drop(target, axis=1)
    y = df[target]

    if dataset == "Salary (Regression)":
        st.markdown("**Task:** Regression")
        X_ = X
        y_ = y
        X_train, X_test, y_train, y_test = train_test_split(X_, y_, test_size=0.2, random_state=42)
        st.subheader("Set Regression Hyperparameters")
        # Could add regularization, etc.
        model = LinearRegression()
        model.fit(X_train, y_train)
        preds = model.predict(X_test)
        mse = mean_squared_error(y_test, preds)
        st.metric("Test MSE", f"{mse:.2f}")
        fig, ax = plt.subplots()
        ax.scatter(y_test, preds)
        ax.plot([y_test.min(), y_test.max()], [y_test.min(), y_test.max()], 'r--')
        ax.set_xlabel("Actual"); ax.set_ylabel("Predicted")
        st.pyplot(fig)
    else:
        # Classification: Encoders for all object cols
        X_enc, encoders = encode_features(X)
        y_enc = y
        if y.dtype == 'O':
            y_enc = LabelEncoder().fit_transform(y)
        model_name = st.selectbox("Select Model", ["Random Forest", "Logistic Regression", "Naive Bayes"])
        if model_name == "Random Forest":
            n_estimators = st.slider("Trees (n_estimators)", 10, 300, 100, 10)
            max_depth = st.slider("Max Depth", 1, 20, 5, 1)
            model = RandomForestClassifier(n_estimators=n_estimators, max_depth=max_depth, random_state=42)
        elif model_name == "Logistic Regression":
            c = st.slider("C (Inverse Regularization)", 0.01, 5.0, 1.0)
            max_iter = st.slider("max_iter", 100, 1000, 300, 100)
            model = LogisticRegression(C=c, max_iter=max_iter)
        else:
            model = GaussianNB()
        X_train, X_test, y_train, y_test = train_test_split(X_enc, y_enc, test_size=0.2, random_state=42, stratify=y_enc)
        model.fit(X_train, y_train)
        preds = model.predict(X_test)
        acc = accuracy_score(y_test, preds)
        st.metric("Test Accuracy", f"{acc*100:.2f}%")
        st.write("Precision:", precision_score(y_test, preds, average='weighted'))
        st.write("Recall:", recall_score(y_test, preds, average='weighted'))
        st.write("F1:", f1_score(y_test, preds, average='weighted'))
        st.markdown("#### Confusion Matrix")
        plot_confusion(confusion_matrix(y_test, preds), labels=np.unique(y))
        st.markdown("#### Feature Importances")
        if hasattr(model, "feature_importances_"):
            show_feature_importances(model, X_enc.columns)

elif page == "Predict":
    st.header("🎯 Make a Prediction")
    dataset = st.selectbox("Dataset", DATASETS.keys())
    df = load_df(DATASETS[dataset])
    target = TARGETS[dataset]
    feature_list = [c for c in df.columns if c != target]

    # --- Single Prediction (with explanation) ---
    st.subheader("Single Input")
    with st.form("pred_form"):
        user_inputs = []
        for i, col in enumerate(feature_list):
            if df[col].dtype in [np.int64, np.float64]:
                val = st.number_input(col, float(df[col].min()), float(df[col].max()), float(df[col].mean()))
            else:
                val = st.selectbox(col, sorted(df[col].unique()))
            user_inputs.append(val)
        submit_pred = st.form_submit_button("Predict")

    if submit_pred:
        # Prepare input row
        input_df = pd.DataFrame([user_inputs], columns=feature_list)
        # Encode categoricals like training
        for col in input_df.columns:
            if df[col].dtype == "O":
                le = LabelEncoder().fit(df[col].astype(str))
                input_df[col] = le.transform([input_df[col][0]])
        
        # Train model on all (for demo, use default RF or LR, yours can persist/tune)
        if dataset == "Salary (Regression)":
            model = LinearRegression()
            model.fit(df[feature_list], df[target])
            pred = model.predict(input_df)[0]
            st.success(f"Predicted Salary: **₹{int(pred):,}**")
        else:
            X, _ = encode_features(df.drop(target, axis=1))
            y = df[target]
            if y.dtype == "O":
                y = LabelEncoder().fit_transform(y)
            model = RandomForestClassifier(n_estimators=100, random_state=0)
            model.fit(X, y)
            # Same encoding for input_df
            input_df_enc, _ = encode_features(input_df)
            pred = model.predict(input_df_enc)[0]
            proba = model.predict_proba(input_df_enc)[0]
            st.success(f"Predicted: **{pred}** (Confidence: {proba.max()*100:.1f}%)")
            st.bar_chart(proba)
            with st.expander("Why this prediction?"):
                show_feature_importances(model, input_df_enc.columns)

    # --- Batch Prediction Upload ---
    st.subheader("Batch Prediction (CSV Upload)")
    with st.expander("Dataset Template/Help"):
        st.write("Columns required in your upload:")
        st.code(", ".join(feature_list))
        st.markdown("The prediction column will be added and available for download.")
    uploaded = st.file_uploader("Upload CSV for Batch Prediction", type=['csv'])
    if uploaded is not None:
        df_upload = pd.read_csv(uploaded)
        feature_batch = [col for col in feature_list if col in df_upload.columns]
        missing_cols = [col for col in feature_list if col not in df_upload.columns]
        if missing_cols:
            st.error(f"Missing required columns: {missing_cols}")
        elif df_upload[feature_batch].shape[0] == 0:
            st.error("No data rows available for prediction.")
        else:
            # Encode categoricals
            for col in feature_batch:
                if df[col].dtype == "O" and df_upload[col].dtype == "O":
                    le = LabelEncoder().fit(df[col].astype(str))
                    df_upload[col] = le.transform(df_upload[col].astype(str))
            # Fit model
            if dataset == "Salary (Regression)":
                model = LinearRegression()
                model.fit(df[feature_list], df[target])
                preds = model.predict(df_upload[feature_batch])
            else:
                X, _ = encode_features(df.drop(target, axis=1))
                y = df[target]
                if y.dtype == "O":
                    y = LabelEncoder().fit_transform(y)
                model = RandomForestClassifier(n_estimators=100, random_state=0)
                model.fit(X, y)
                df_upload_enc, _ = encode_features(df_upload[feature_batch])
                preds = model.predict(df_upload_enc)
            df_upload['Prediction'] = preds
            st.write(df_upload.head())
            # Download
            csv_out = io.StringIO()
            df_upload.to_csv(csv_out, index=False)
            st.download_button("Download Prediction Results", csv_out.getvalue(), file_name="predictions.csv", mime="text/csv")
            st.success("Batch prediction finished! Download the results above.")

elif page == "About":
    st.header("About ModelVista")
    st.markdown("""
    - **Purpose:** ModelVista - your one-stop Shop for ML data exploration, training, prediction, and visualization.  
    - **Cool Features:** Plug in new datasets, models, metrics, and batch tools!
    - **Built for: Celebal Internship 2025 Assignment**
    """)
    st.info("Thanks for exploring ModelVista! 🚀")
    st.markdown("Connect on [LinkedIn](https://www.linkedin.com/in/shubham-s07/)")
