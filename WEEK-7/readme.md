# ModelVista

**An Interactive ML Model Deployment Platform**  
*Internship Assignment Submission – July 2025*

---

## 🚀 Overview

**ModelVista** is a modern Streamlit application purpose-built for interactive machine learning model deployment, exploration, and interpretation. Developed for my internship assignment, ModelVista enables users to:

- Explore and visualize diverse, real-world datasets  
- Train, tune, and analyze multiple machine learning models  
- Make predictions on new data (single or batch) right in the browser  
- Interpret results visually, with confidence bars, feature importance charts, and explainers

---

## 📝 Assignment Statement

> **Deploying Machine Learning Models with Streamlit**  
> Develop a web application using Streamlit to deploy a trained machine learning model. The app should allow users to input data, receive predictions, and understand model outputs through visualizations. This task will help you learn how to make your models accessible and interactive.

---

## 🏆 Features

- **Multi-Page Navigation:** Home, Data Explorer, Playground, Predict, and About pages
- **Modern, Responsive UI:** Clean layouts, clear navigation, and rich visual feedback
- **Dataset Exploration:** Preview, describe, and visualize dataset features and stats
- **Model Playground:** Select algorithms, tune hyperparameters, and instantly view model metrics, confusion matrix, and feature rankings
- **Predictions:** Enter values or upload CSVs for real-time prediction; results come with explanations and probability/confidence scores
- **Batch Tools:** Upload datasets for bulk prediction and download annotated results
- **Interpretability:** Visual and text explanations, including confidence and feature bars, on every result
- **Extensible:** Easily add new datasets and models for future needs

---

## 🚦 How It Works

### 1. Home

Dashboard overview, navigation guidance, assignment context

**Screenshot:**  
<!-- Paste Home Page screenshot URL here -->

---

### 2. Data Explorer

Preview head, stats, distributions, view columns and get a feel for each dataset

**Screenshot:**  
<!-- Paste Data Explorer screenshot URL here -->

---

### 3. Model Playground

Choose dataset & algorithm, set hyperparameters, train instantly, and get metrics, confusion matrix, and feature importances

**Screenshot:**  
<!-- Paste Model Playground screenshot URL here -->

---

### 4. Predict

Input data for a single prediction, see confidence and a feature-based explanation

**Screenshot:**  
<!-- Paste Single Prediction page screenshot URL here -->

---

### 5. Batch Prediction

Upload CSV files, get predictions for all rows, preview and download the results

**Screenshot:**  
<!-- Paste Batch Prediction screenshot URL here -->

---

### 6. About

Project info, contact, and assignment statement

**Screenshot:**  
<!-- Paste About page screenshot URL here -->

---

## 🛠️ Technologies Used

- **Streamlit** — for the web interface and app logic
- **Pandas** — for data wrangling
- **Scikit-learn** — for machine learning algorithms and metrics
- **Matplotlib, Seaborn** — for plots and charts
- **Python 3.10+**


---

## 🚀 Getting Started

1. **Clone this repository**
    ```
    git clone https://github.com/yourusername/ModelVista.git
    cd ModelVista
    ```

2. **Install dependencies**
    ```
    pip install -r requirements.txt
    ```

3. **Run the app**
    ```
    streamlit run streamlit_app.py
    ```

4. **Visit the local URL in your browser and start exploring!**

---


## 💡 Customization

- **Add or swap datasets:** Place datasets in the `Dataset/` folder and add them to the app's mapping.
- **Personalize Look & Feel:** Change theme colors or add logos in `.streamlit/config.toml`.
- **Add Models:** Extend model classes and evaluations in `streamlit_app.py` as needed.

---

## 🔍 Algorithms Included

- K-Nearest Neighbors
- Support Vector Machines  
- Naive Bayes Classifiers  
- Decision Tree and Random Forest  
- Linear & Logistic Regression  

Each is paired with dynamic visualizations and live interpretability for practical deployment.

---

## 📚 Datasets

A mix of classic and real-world datasets including:  
- Heart Disease  
- Titanic  
- Iris  
- Salary Regression  
- Diabetes  
- Car Evaluation  
- ...and more

All attribution and details are visible in the app.

---

## 📦 Libraries Used

- `numpy`
- `pandas`
- `scikit-learn`
- `matplotlib`
- `seaborn`
- `streamlit`



---

**Thank you for trying out ModelVista!  
This platform embodies practical, interactive ML deployment and a user-friendly approach to explainable AI.**

*Replace each screenshot placeholder with your actual image URLs for a polished demonstration on GitHub.*


