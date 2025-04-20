import React, { useState } from 'react';
import { Product } from '../../types';
import Button from '../ui/Button';

interface JourneyFormProps {
  stage: string;
  product: Product;
  onSubmit: (data: Record<string, any>) => void;
  onBack: () => void;
}

const JourneyForm: React.FC<JourneyFormProps> = ({
  stage,
  product,
  onSubmit,
  onBack,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    // Handle checkbox inputs
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: checkbox.checked,
      }));
      return;
    }
    
    // Handle radio inputs
    if (type === 'radio') {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
      return;
    }
    
    // Handle numeric inputs
    if (type === 'number') {
      setFormData(prev => ({
        ...prev,
        [name]: parseFloat(value),
      }));
      return;
    }
    
    // Handle text inputs
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const renderAwarenessForm = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          How did you first hear about {product.name}?
        </label>
        <select
          name="source"
          value={formData.source || ''}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          required
        >
          <option value="">Select an option</option>
          <option value="Social Media">Social Media</option>
          <option value="Friends/Family">Friends or Family</option>
          <option value="Tech Review">Tech Review</option>
          <option value="Advertisement">Advertisement</option>
          <option value="In-Store">In-Store</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          What was your initial impression?
        </label>
        <select
          name="initialImpression"
          value={formData.initialImpression || ''}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          required
        >
          <option value="">Select an option</option>
          <option value="Very Positive">Very Positive</option>
          <option value="Positive">Positive</option>
          <option value="Neutral">Neutral</option>
          <option value="Negative">Negative</option>
          <option value="Very Negative">Very Negative</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Rate your interest level (1-5)
        </label>
        <div className="flex space-x-4">
          {[1, 2, 3, 4, 5].map((value) => (
            <label key={value} className="flex items-center">
              <input
                type="radio"
                name="awarenessRating"
                value={value}
                checked={formData.awarenessRating === value}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-700">{value}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderConsiderationForm = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Which alternatives did you consider?
        </label>
        <textarea
          name="alternativesConsidered"
          value={formData.alternativesConsidered || ''}
          onChange={handleChange}
          rows={3}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="e.g., Sony WF-1000XM4, Bose QuietComfort Earbuds"
          required
        ></textarea>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          How did you research before making a decision?
        </label>
        <div className="space-y-2">
          {['YouTube Reviews', 'Tech Blogs', 'Social Media', 'Friends/Family', 'In-store Demo'].map((method) => (
            <label key={method} className="flex items-center">
              <input
                type="checkbox"
                name={`researchMethod_${method}`}
                checked={formData[`researchMethod_${method}`] || false}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-700">{method}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          What features were most important to you?
        </label>
        <div className="space-y-2">
          {['Sound Quality', 'Noise Cancellation', 'Battery Life', 'Comfort', 'Price', 'Brand', 'Design'].map((feature) => (
            <label key={feature} className="flex items-center">
              <input
                type="checkbox"
                name={`keyFeature_${feature}`}
                checked={formData[`keyFeature_${feature}`] || false}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-700">{feature}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPurchaseForm = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Where did you purchase the {product.name}?
        </label>
        <select
          name="purchaseLocation"
          value={formData.purchaseLocation || ''}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          required
        >
          <option value="">Select location</option>
          <option value="Brand Store">Brand's Official Store</option>
          <option value="Electronics Retailer">Electronics Retailer</option>
          <option value="Online Marketplace">Online Marketplace (Amazon, etc.)</option>
          <option value="Telecommunications Provider">Telecommunications Provider</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          What was the main deciding factor?
        </label>
        <select
          name="decisionFactor"
          value={formData.decisionFactor || ''}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          required
        >
          <option value="">Select factor</option>
          <option value="Price">Price</option>
          <option value="Features">Features</option>
          <option value="Brand Reputation">Brand Reputation</option>
          <option value="Reviews">Reviews</option>
          <option value="Design">Design</option>
          <option value="Availability">Availability</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Purchase price ($)
        </label>
        <input
          type="number"
          name="price"
          value={formData.price || product.price}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
    </div>
  );

  const renderPostPurchaseForm = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          How often do you use the {product.name}?
        </label>
        <select
          name="usageFrequency"
          value={formData.usageFrequency || ''}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          required
        >
          <option value="">Select frequency</option>
          <option value="Daily">Daily</option>
          <option value="Several times a week">Several times a week</option>
          <option value="Weekly">Weekly</option>
          <option value="Occasionally">Occasionally</option>
          <option value="Rarely">Rarely</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Rate your satisfaction (1-5)
        </label>
        <div className="flex space-x-4">
          {[1, 2, 3, 4, 5].map((value) => (
            <label key={value} className="flex items-center">
              <input
                type="radio"
                name="satisfaction"
                value={value}
                checked={formData.satisfaction === value}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-700">{value}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Would you recommend this product?
        </label>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="wouldRecommend"
              value="true"
              checked={formData.wouldRecommend === "true"}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-gray-700">Yes</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="wouldRecommend"
              value="false"
              checked={formData.wouldRecommend === "false"}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-gray-700">No</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Share your experience with this product
        </label>
        <textarea
          name="review"
          value={formData.review || ''}
          onChange={handleChange}
          rows={4}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="What do you like or dislike about this product?"
        ></textarea>
      </div>
    </div>
  );

  const renderSupportForm = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Have you contacted support for this product?
        </label>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="contactedSupport"
              value="true"
              checked={formData.contactedSupport === "true"}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-gray-700">Yes</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="contactedSupport"
              value="false"
              checked={formData.contactedSupport === "false"}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-gray-700">No</span>
          </label>
        </div>
      </div>

      {formData.contactedSupport === "true" && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              What was the reason for contacting support?
            </label>
            <select
              name="contactReason"
              value={formData.contactReason || ''}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="">Select reason</option>
              <option value="Technical Issue">Technical Issue</option>
              <option value="Warranty Claim">Warranty Claim</option>
              <option value="Product Information">Product Information</option>
              <option value="Returns/Refunds">Returns/Refunds</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              How quickly did you receive a response?
            </label>
            <select
              name="responseTime"
              value={formData.responseTime || ''}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="">Select timeframe</option>
              <option value="Same day">Same day</option>
              <option value="Within 24 hours">Within 24 hours</option>
              <option value="Within 48 hours">Within 48 hours</option>
              <option value="Within a week">Within a week</option>
              <option value="More than a week">More than a week</option>
              <option value="No response">No response</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Was your issue resolved?
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="resolved"
                  value="true"
                  checked={formData.resolved === "true"}
                  onChange={handleChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-700">Yes</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="resolved"
                  value="false"
                  checked={formData.resolved === "false"}
                  onChange={handleChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-700">No</span>
              </label>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rate your support experience (1-5)
            </label>
            <div className="flex space-x-4">
              {[1, 2, 3, 4, 5].map((value) => (
                <label key={value} className="flex items-center">
                  <input
                    type="radio"
                    name="supportSatisfaction"
                    value={value}
                    checked={formData.supportSatisfaction === value}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{value}</span>
                </label>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );

  const renderFormByStage = () => {
    switch (stage) {
      case 'awareness':
        return renderAwarenessForm();
      case 'consideration':
        return renderConsiderationForm();
      case 'purchase':
        return renderPurchaseForm();
      case 'post-purchase':
        return renderPostPurchaseForm();
      case 'support':
        return renderSupportForm();
      default:
        return <p>Unknown stage</p>;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {stage === 'awareness' && 'Tell us how you discovered this product'}
        {stage === 'consideration' && 'Tell us about your research process'}
        {stage === 'purchase' && 'Tell us about your purchase decision'}
        {stage === 'post-purchase' && 'Tell us about your experience using the product'}
        {stage === 'support' && 'Tell us about your support experience'}
      </h2>
      
      {renderFormByStage()}
      
      <div className="flex items-center justify-between mt-6">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
        >
          Back
        </Button>
        <Button
          type="submit"
          variant="primary"
        >
          {stage === 'support' ? 'Complete Journey' : 'Next Step'}
        </Button>
      </div>
    </form>
  );
};

export default JourneyForm;