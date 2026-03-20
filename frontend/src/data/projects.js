export const TAG_COLORS = {
  Classification: '#00ff88',
  'Computer Vision': '#00cfff',
  NLP: '#ff6b6b',
  RecSys: '#ffd93d',
  Forecasting: '#c77dff',
  'Generative AI': '#ff9a3c',
}

// ─── Replace each apiEndpoint with your deployed API URL ──────────────────────
// Field types supported:
//   text | textarea | number | select | file | range | tags
// outputType:
//   label | image | chart | list | json

const projects = [
  {
    id: 1,
    slug: 'diabetes-prediction',
    title: 'Diabetes Prediction',
    description: 'Machine learning model for predicting diabetes onset based on clinical features.',
    longDescription: 'Enter the patient\'s clinical features below and the model will predict the likelihood of diabetes. The model is trained on a dataset of 768 patients with various medical indicators.',
    tech: ['Python', 'Scikit-learn', 'Pandas', 'FastAPI', 'Numpy'],
    metrics: { Accuracy: '78.5%', Precision: '76.2%', Recall: '74.1%', Dataset: '768 patients', Model: 'Logistic Regression' },
    github: 'https://github.com/Vivekraj-adhikari/scratch-vs-sklearn/tree/main/logistic-regression',
    tag: 'Classification',
    apiEndpoint: 'http://localhost:8000/predict_diabetes/',
    demo: {
      outputType: 'json',
      fields: [
        { id: 'glucose', label: 'Glucose', type: 'number', placeholder: '249.99', min: 0, step: 0.01, required: true },
        { id: 'blood_pressure', label: 'BloodPressure', type: 'number', placeholder: '-1.36', step: 0.0001 },
        { id: 'skin_thickness', label: 'SkinThickness', type: 'number', placeholder: '0.978', step: 0.0001 },
        { id: 'insulin', label: 'Insulin', type: 'number', placeholder: '1.191', step: 0.0001 },
        { id: 'bmi', label: 'BMI', type: 'number', placeholder: '0.266', step: 0.0001 },
        { id: 'diabetes_pedigree_function', label: 'DiabetesPedigreeFunction', type: 'range', min: 0, max: 2, step: 0.01, unit: '' },
      ],
    },
  },
  {
    id: 2,
    slug: 'image-segmentation',
    title: 'Image Segmentation CNN',
    description: 'U-Net architecture for medical image segmentation of tumor regions. Trained on custom annotated MRI dataset.',
    longDescription: 'Upload an MRI scan (PNG / JPG) and the U-Net model will return a segmentation mask highlighting regions of interest. Adjust the confidence threshold to control sensitivity.',
    tech: ['PyTorch', 'CUDA', 'OpenCV', 'NumPy'],
    metrics: { 'Dice Score': '94.7%', Dataset: '12K MRI scans', Model: 'U-Net' },
    github: '#',
    tag: 'Computer Vision',
    apiEndpoint: 'https://your-api.example.com/segmentation/predict',
    demo: {
      outputType: 'image',
      fields: [
        { id: 'image', label: 'Upload MRI Scan', type: 'file', accept: 'image/*', required: true },
        { id: 'threshold', label: 'Confidence Threshold', type: 'range', min: 0.1, max: 0.9, step: 0.05, unit: '' },
        {
          id: 'mode', label: 'Output Mode', type: 'select',
          options: [
            { label: 'Segmentation Mask', value: 'mask' },
            { label: 'Overlay on Original', value: 'overlay' },
            { label: 'Side-by-Side', value: 'side_by_side' },
          ],
        },
      ],
    },
  },
  {
    id: 3,
    slug: 'sentiment-analyzer',
    title: 'NLP Sentiment Analyzer',
    description: 'Transformer-based sentiment classification fine-tuned on domain-specific review data with custom tokenization.',
    longDescription: 'Paste any product review, tweet, or free-form text. The fine-tuned BERT model predicts sentiment (Positive / Neutral / Negative) along with per-class confidence scores.',
    tech: ['HuggingFace', 'BERT', 'FastAPI', 'Docker'],
    metrics: { Accuracy: '91.4%', F1: '90.8%', Dataset: '500K reviews', Model: 'BERT-base' },
    github: '#',
    tag: 'NLP',
    apiEndpoint: 'https://your-api.example.com/sentiment/predict',
    demo: {
      outputType: 'label',
      fields: [
        { id: 'text', label: 'Input Text', type: 'textarea', placeholder: 'Paste a review or any sentence…', rows: 5, required: true },
        {
          id: 'language', label: 'Language', type: 'select',
          options: [
            { label: 'English', value: 'en' },
            { label: 'Spanish', value: 'es' },
            { label: 'French', value: 'fr' },
          ],
        },
        { id: 'topk', label: 'Return top-K labels', type: 'range', min: 1, max: 5, step: 1, unit: '' },
      ],
    },
  },
  {
    id: 4,
    slug: 'recommendation-engine',
    title: 'Movie Recommendation Engine',
    description: 'Hybrid collaborative + content-based filtering system serving personalised recommendations at scale.',
    longDescription: 'Enter a user ID (or a list of movies you like) and the hybrid CF engine will return the top-N personalised recommendations ranked by predicted rating.',
    tech: ['PySpark', 'ALS', 'Redis', 'Flask'],
    metrics: { 'NDCG@10': '0.87', Dataset: '25M ratings', Model: 'Hybrid CF' },
    github: '#',
    tag: 'RecSys',
    apiEndpoint: 'https://your-api.example.com/recommendations/predict',
    demo: {
      outputType: 'list',
      fields: [
        { id: 'user_id', label: 'User ID', type: 'number', placeholder: '42', required: true },
        { id: 'liked_movies', label: 'Movies You Liked (comma-separated)', type: 'tags', placeholder: 'Inception, Interstellar, Dune' },
        { id: 'top_n', label: 'Number of Recommendations', type: 'range', min: 3, max: 20, step: 1, unit: '' },
        {
          id: 'genre_filter', label: 'Genre Filter', type: 'select',
          options: [
            { label: 'All Genres', value: 'all' },
            { label: 'Action', value: 'action' },
            { label: 'Drama', value: 'drama' },
            { label: 'Sci-Fi', value: 'scifi' },
            { label: 'Comedy', value: 'comedy' },
            { label: 'Thriller', value: 'thriller' },
          ],
        },
      ],
    },
  },
  {
    id: 5,
    slug: 'time-series-forecasting',
    title: 'Time Series Forecasting',
    description: 'LSTM + Transformer hybrid for multi-variate stock price prediction with attention visualisation.',
    longDescription: 'Select a stock ticker and forecast horizon. The LSTM-Attention model returns predicted closing prices along with confidence intervals visualised as a line chart.',
    tech: ['TensorFlow', 'Keras', 'TA-Lib', 'Plotly'],
    metrics: { MAPE: '2.3%', Dataset: '10yr OHLCV', Model: 'LSTM-Attn' },
    github: '#',
    tag: 'Forecasting',
    apiEndpoint: 'https://your-api.example.com/forecast/predict',
    demo: {
      outputType: 'chart',
      fields: [
        { id: 'ticker', label: 'Stock Ticker', type: 'text', placeholder: 'AAPL', required: true },
        { id: 'horizon', label: 'Forecast Horizon (days)', type: 'range', min: 1, max: 30, step: 1, unit: 'd' },
        {
          id: 'interval', label: 'Data Interval', type: 'select',
          options: [
            { label: 'Daily', value: '1d' },
            { label: 'Weekly', value: '1wk' },
            { label: 'Monthly', value: '1mo' },
          ],
        },
        {
          id: 'confidence', label: 'Show Confidence Interval', type: 'select',
          options: [{ label: 'Yes', value: 'true' }, { label: 'No', value: 'false' }],
        },
      ],
    },
  },
  {
    id: 6,
    slug: 'gan-art-generator',
    title: 'GAN Art Generator',
    description: 'StyleGAN2-based generative model trained on curated art datasets. Produces high-resolution 1024×1024 outputs.',
    longDescription: 'Describe your desired artwork and tweak the style parameters. StyleGAN2 will synthesise an original 1024×1024 image from the latent space guided by your inputs.',
    tech: ['PyTorch', 'CUDA', 'Weights & Biases', 'PIL'],
    metrics: { FID: '18.4', Dataset: '80K images', Model: 'StyleGAN2' },
    github: '#',
    tag: 'Generative AI',
    apiEndpoint: 'https://your-api.example.com/gan/generate',
    demo: {
      outputType: 'image',
      fields: [
        { id: 'prompt', label: 'Style Prompt', type: 'textarea', placeholder: 'Impressionist landscape, warm sunset colours, oil on canvas…', rows: 3, required: true },
        {
          id: 'style', label: 'Base Style', type: 'select',
          options: [
            { label: 'Abstract', value: 'abstract' },
            { label: 'Impressionism', value: 'impressionism' },
            { label: 'Cubism', value: 'cubism' },
            { label: 'Surrealism', value: 'surrealism' },
            { label: 'Photorealism', value: 'photorealism' },
          ],
        },
        { id: 'truncation', label: 'Truncation (diversity ↔ quality)', type: 'range', min: 0.3, max: 1.0, step: 0.05, unit: '' },
        { id: 'seed', label: 'Random Seed (blank = random)', type: 'number', placeholder: '42', min: 0 },
      ],
    },
  },
]

export default projects
