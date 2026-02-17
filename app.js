const { useState, useEffect, useRef } = React;

// AI Engine - Simulates AI processing for task breakdown and risk calculation
const AIEngine = {
    // Parse tasks and break them down into subtasks
    parseTask: async (taskDescription, deadline, hoursPerDay, energyLevel) => {
        // Simulate AI processing delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // AI-powered task breakdown simulation
        const keywords = taskDescription.toLowerCase();
        let subtasks = [];

        if (keywords.includes('dashboard') || keywords.includes('ui')) {
            subtasks = [
                { name: 'Design wireframe and layout', hours: 3, priority: 'high', completed: false },
                { name: 'Implement component structure', hours: 4, priority: 'high', completed: false },
                { name: 'Add interactive charts', hours: 5, priority: 'medium', completed: false },
                { name: 'Style with CSS/Tailwind', hours: 3, priority: 'medium', completed: false },
                { name: 'Test responsiveness', hours: 2, priority: 'low', completed: false }
            ];
        } else if (keywords.includes('api') || keywords.includes('backend')) {
            subtasks = [
                { name: 'Design API architecture', hours: 4, priority: 'high', completed: false },
                { name: 'Set up database schema', hours: 3, priority: 'high', completed: false },
                { name: 'Implement endpoints', hours: 6, priority: 'high', completed: false },
                { name: 'Add authentication', hours: 4, priority: 'medium', completed: false },
                { name: 'Write tests', hours: 3, priority: 'low', completed: false }
            ];
        } else if (keywords.includes('presentation') || keywords.includes('report')) {
            subtasks = [
                { name: 'Research and gather data', hours: 4, priority: 'high', completed: false },
                { name: 'Create outline', hours: 2, priority: 'high', completed: false },
                { name: 'Design slides/document', hours: 5, priority: 'medium', completed: false },
                { name: 'Write content', hours: 6, priority: 'medium', completed: false },
                { name: 'Review and polish', hours: 2, priority: 'low', completed: false }
            ];
        } else {
            // Generic task breakdown
            const estimatedHours = Math.max(2, Math.ceil(taskDescription.length / 10));
            const numSubtasks = Math.min(6, Math.max(3, Math.ceil(estimatedHours / 3)));

            for (let i = 0; i < numSubtasks; i++) {
                subtasks.push({
                    name: `Subtask ${i + 1}: ${taskDescription.slice(0, 30)}...`,
                    hours: Math.ceil(estimatedHours / numSubtasks),
                    priority: i < 2 ? 'high' : i < 4 ? 'medium' : 'low',
                    completed: false
                });
            }
        }

        return subtasks;
    },

    // Calculate completion probability with AI-enhanced prediction
    calculateRisk: async (subtasks, deadline, hoursPerDay, energyLevel = 1.0) => {
        await new Promise(resolve => setTimeout(resolve, 500));

        const totalHours = subtasks.reduce((sum, task) => sum + task.hours, 0);
        const daysUntilDeadline = Math.ceil((new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24));
        const availableHours = daysUntilDeadline * hoursPerDay;

        // Apply planning fallacy correction (configurable factor)
        const planningFallacyFactor = 1.4;
        const correctedHours = totalHours * planningFallacyFactor;

        // Energy level affects productivity (0.5 = tired, 1.0 = normal, 1.5 = peak)
        const effectiveHours = availableHours * energyLevel;

        // Calculate raw probability
        let rawProbability = Math.min(100, (effectiveHours / correctedHours) * 100);

        // Add uncertainty factor based on task count
        const uncertaintyPenalty = Math.min(20, subtasks.length * 2);
        rawProbability -= uncertaintyPenalty;

        // Ensure probability is between 0-100
        const probability = Math.max(0, Math.min(100, rawProbability));

        // Determine risk level using configurable thresholds
        let riskLevel, riskColor;
        if (probability >= 70) {
            riskLevel = 'low';
            riskColor = '#10b981';
        } else if (probability >= 40) {
            riskLevel = 'medium';
            riskColor = '#f59e0b';
        } else {
            riskLevel = 'high';
            riskColor = '#ef4444';
        }

        // Generate detailed AI recommendations
        const recommendations = [];
        if (probability < 70) {
            recommendations.push(`â° Increase daily hours to ${Math.ceil(correctedHours / daysUntilDeadline)}h to improve success probability`);
        }
        if (probability < 50) {
            recommendations.push('ðŸ“… Consider extending deadline by ' + Math.ceil((correctedHours - effectiveHours) / (hoursPerDay * energyLevel)) + ' days or reducing project scope');
            recommendations.push('ðŸŽ¯ Prioritize high-priority subtasks first to deliver core functionality');
            recommendations.push('ðŸ”„ Break down large subtasks into smaller 2-3 hour chunks for better tracking');
        }
        if (energyLevel < 0.8) {
            recommendations.push('ðŸ’ª Schedule regular breaks every 90 minutes to maintain energy and productivity');
            recommendations.push('ðŸŒ™ Ensure adequate sleep (7-8 hours) for sustained performance');
        }
        if (subtasks.length > 5) {
            recommendations.push('ðŸ“Š Complex project detected - consider breaking down subtasks further for better granularity');
        }
        if (probability >= 70 && probability < 85) {
            recommendations.push('âœ… You\'re on track! Build in buffer time for unexpected challenges');
        }
        if (probability >= 85) {
            recommendations.push('ðŸš€ Excellent planning! You have comfortable margin for quality and refinement');
        }
        if (daysUntilDeadline <= 2) {
            recommendations.push('âš¡ Tight deadline - minimize distractions and use time-blocking techniques');
        }

        return {
            probability: Math.round(probability),
            riskLevel,
            riskColor,
            recommendations,
            metrics: {
                totalHours,
                availableHours: effectiveHours,
                daysRemaining: daysUntilDeadline,
                hoursPerDay: Math.ceil(correctedHours / daysUntilDeadline)
            }
        };
    },

    // Generate optimized daily plan
    generateDailyPlan: async (subtasks, deadline, hoursPerDay, energyLevel = 1.0) => {
        await new Promise(resolve => setTimeout(resolve, 800));

        const daysUntilDeadline = Math.ceil((new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24));
        const dailyPlans = [];

        // Sort subtasks by priority
        const sortedTasks = [...subtasks].sort((a, b) => {
            const priorityOrder = { high: 0, medium: 1, low: 2 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });

        let remainingTasks = [...sortedTasks];

        for (let day = 0; day < daysUntilDeadline; day++) {
            const date = new Date();
            date.setDate(date.getDate() + day);

            const dailyTasks = [];
            let hoursAllocated = 0;

            // Allocate tasks for the day
            while (hoursAllocated < hoursPerDay && remainingTasks.length > 0) {
                const task = remainingTasks[0];
                const hoursToAllocate = Math.min(task.hours, hoursPerDay - hoursAllocated);

                if (hoursToAllocate > 0) {
                    dailyTasks.push({
                        ...task,
                        allocatedHours: hoursToAllocate,
                        isPartial: hoursToAllocate < task.hours
                    });

                    hoursAllocated += hoursToAllocate;

                    if (hoursToAllocate >= task.hours) {
                        remainingTasks.shift();
                    } else {
                        remainingTasks[0] = {
                            ...task,
                            hours: task.hours - hoursToAllocate
                        };
                    }
                }
            }

            // Calculate daily risk score
            const utilization = hoursAllocated / hoursPerDay;
            let dailyRisk;
            if (utilization > 0.9) dailyRisk = 'high';
            else if (utilization > 0.7) dailyRisk = 'medium';
            else dailyRisk = 'low';

            dailyPlans.push({
                date: date.toISOString().split('T')[0],
                tasks: dailyTasks,
                plannedHours: hoursAllocated,
                utilization: Math.round(utilization * 100),
                riskLevel: dailyRisk
            });
        }

        return dailyPlans;
    },

    // Dynamic recalibration based on progress
    recalibrate: async (currentPlan, completedTasks, remainingDeadline, hoursPerDay) => {
        await new Promise(resolve => setTimeout(resolve, 600));

        const incompleteTasks = currentPlan.filter(task => !completedTasks.includes(task.name));

        // Recalculate with updated parameters
        const newRisk = await AIEngine.calculateRisk(incompleteTasks, remainingDeadline, hoursPerDay);
        const newPlan = await AIEngine.generateDailyPlan(incompleteTasks, remainingDeadline, hoursPerDay);

        return {
            risk: newRisk,
            plan: newPlan,
            adjustments: [
                'Schedule recalibrated based on current progress',
                `${completedTasks.length} tasks completed successfully`,
                `${incompleteTasks.length} tasks remaining`
            ]
        };
    }
};

// Main App Component
function ExecuNovaApp() {
    const [tasks, setTasks] = useState([]);
    const [currentTask, setCurrentTask] = useState({
        name: '',
        deadline: '',
        hoursPerDay: 6,
        energyLevel: 1.0
    });
    const [subtasks, setSubtasks] = useState([]);
    const [riskAnalysis, setRiskAnalysis] = useState(null);
    const [dailyPlan, setDailyPlan] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeView, setActiveView] = useState('input'); // input, analysis, plan
    const [showStats, setShowStats] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('execunova_data');
        if (saved) {
            const data = JSON.parse(saved);
            setTasks(data.tasks || []);
        }
    }, []);

    // Save to localStorage whenever data changes
    useEffect(() => {
        localStorage.setItem('execunova_data', JSON.stringify({ tasks }));
    }, [tasks]);

    const handleAnalyze = async () => {
        if (!currentTask.name || !currentTask.deadline) {
            alert('Please fill in task name and deadline');
            return;
        }

        setLoading(true);
        setActiveView('analysis');

        try {
            // Parse task into subtasks
            const parsedSubtasks = await AIEngine.parseTask(
                currentTask.name,
                currentTask.deadline,
                currentTask.hoursPerDay,
                currentTask.energyLevel
            );
            setSubtasks(parsedSubtasks);

            // Calculate risk
            const risk = await AIEngine.calculateRisk(
                parsedSubtasks,
                currentTask.deadline,
                currentTask.hoursPerDay,
                currentTask.energyLevel
            );
            setRiskAnalysis(risk);

            // Generate daily plan
            const plan = await AIEngine.generateDailyPlan(
                parsedSubtasks,
                currentTask.deadline,
                currentTask.hoursPerDay,
                currentTask.energyLevel
            );
            setDailyPlan(plan);

            // Save task
            setTasks([...tasks, {
                id: Date.now(),
                ...currentTask,
                subtasks: parsedSubtasks,
                risk,
                plan,
                createdAt: new Date().toISOString()
            }]);

        } catch (error) {
            console.error('Analysis error:', error);
            alert('Error analyzing task. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const toggleSubtask = (index) => {
        const updated = [...subtasks];
        updated[index].completed = !updated[index].completed;
        setSubtasks(updated);

        // Recalculate risk
        recalculateRisk(updated);
    };

    const recalculateRisk = async (updatedSubtasks) => {
        const incompleteTasks = updatedSubtasks.filter(t => !t.completed);

        if (incompleteTasks.length === 0) {
            setRiskAnalysis({
                probability: 100,
                riskLevel: 'low',
                riskColor: '#10b981',
                recommendations: ['All tasks completed! Congratulations on finishing your project!'],
                metrics: { totalHours: 0, availableHours: 0, daysRemaining: 0 }
            });
            return;
        }

        const risk = await AIEngine.calculateRisk(
            incompleteTasks,
            currentTask.deadline,
            currentTask.hoursPerDay,
            currentTask.energyLevel
        );
        setRiskAnalysis(risk);
    };

    const resetApp = () => {
        setCurrentTask({ name: '', deadline: '', hoursPerDay: 6, energyLevel: 1.0 });
        setSubtasks([]);
        setRiskAnalysis(null);
        setDailyPlan([]);
        setActiveView('input');
    };

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <header className="text-center mb-8">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
                        ExecuNova AI
                    </h1>
                    <p className="text-xl md:text-2xl text-purple-200 font-light">
                        Predict. Plan. Finish.
                    </p>
                    <p className="text-purple-300 mt-2">
                        AI-Powered Deadline Prediction & Adaptive Task Planning
                    </p>
                </header>

                {/* Navigation */}
                <nav className="flex justify-center gap-4 mb-8">
                    <button
                        onClick={() => setActiveView('input')}
                        className={`px-6 py-3 rounded-lg font-semibold transition ${
                            activeView === 'input'
                                ? 'bg-white text-purple-600 glow'
                                : 'bg-purple-500 bg-opacity-30 text-white hover:bg-opacity-50'
                        }`}
                    >
                        New Task
                    </button>
                    {riskAnalysis && (
                        <>
                            <button
                                onClick={() => setActiveView('analysis')}
                                className={`px-6 py-3 rounded-lg font-semibold transition ${
                                    activeView === 'analysis'
                                        ? 'bg-white text-purple-600 glow'
                                        : 'bg-purple-500 bg-opacity-30 text-white hover:bg-opacity-50'
                                }`}
                            >
                                Risk Analysis
                            </button>
                            <button
                                onClick={() => setActiveView('plan')}
                                className={`px-6 py-3 rounded-lg font-semibold transition ${
                                    activeView === 'plan'
                                        ? 'bg-white text-purple-600 glow'
                                        : 'bg-purple-500 bg-opacity-30 text-white hover:bg-opacity-50'
                                }`}
                            >
                                Daily Plan
                            </button>
                        </>
                    )}
                </nav>

                {/* Main Content */}
                <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-10 glow">
                    {activeView === 'input' && (
                        <TaskInput
                            currentTask={currentTask}
                            setCurrentTask={setCurrentTask}
                            onAnalyze={handleAnalyze}
                            loading={loading}
                        />
                    )}

                    {activeView === 'analysis' && riskAnalysis && (
                        <RiskAnalysis
                            riskAnalysis={riskAnalysis}
                            subtasks={subtasks}
                            toggleSubtask={toggleSubtask}
                            onReset={resetApp}
                        />
                    )}

                    {activeView === 'plan' && dailyPlan.length > 0 && (
                        <DailyPlanView
                            dailyPlan={dailyPlan}
                            riskAnalysis={riskAnalysis}
                        />
                    )}
                </div>

                {/* Task History */}
                {tasks.length > 0 && activeView === 'input' && (
                    <TaskHistory tasks={tasks} setTasks={setTasks} />
                )}
            </div>
        </div>
    );
}

// Task Input Component
function TaskInput({ currentTask, setCurrentTask, onAnalyze, loading }) {
    const getTomorrowDate = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    };

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold gradient-text mb-6">
                Create New Task
            </h2>

            <div>
                <label className="block text-gray-700 font-semibold mb-2">
                    Task Description
                </label>
                <input
                    type="text"
                    value={currentTask.name}
                    onChange={(e) => setCurrentTask({ ...currentTask, name: e.target.value })}
                    placeholder="e.g., Build responsive dashboard with charts"
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:border-purple-500 focus:outline-none transition"
                />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                        Deadline
                    </label>
                    <input
                        type="date"
                        value={currentTask.deadline}
                        onChange={(e) => setCurrentTask({ ...currentTask, deadline: e.target.value })}
                        min={getTomorrowDate()}
                        className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:border-purple-500 focus:outline-none transition"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                        Available Hours per Day: {currentTask.hoursPerDay}h
                    </label>
                    <input
                        type="range"
                        min="1"
                        max="16"
                        value={currentTask.hoursPerDay}
                        onChange={(e) => setCurrentTask({ ...currentTask, hoursPerDay: parseInt(e.target.value) })}
                        className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>1h</span>
                        <span>8h</span>
                        <span>16h</span>
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-gray-700 font-semibold mb-2">
                    Energy Level: {currentTask.energyLevel === 0.5 ? 'Tired' : currentTask.energyLevel === 1.0 ? 'Normal' : 'Peak'}
                </label>
                <div className="flex gap-4">
                    <button
                        onClick={() => setCurrentTask({ ...currentTask, energyLevel: 0.5 })}
                        className={`flex-1 py-3 rounded-lg font-semibold transition ${
                            currentTask.energyLevel === 0.5
                                ? 'bg-orange-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        Tired (50%)
                    </button>
                    <button
                        onClick={() => setCurrentTask({ ...currentTask, energyLevel: 1.0 })}
                        className={`flex-1 py-3 rounded-lg font-semibold transition ${
                            currentTask.energyLevel === 1.0
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        Normal (100%)
                    </button>
                    <button
                        onClick={() => setCurrentTask({ ...currentTask, energyLevel: 1.5 })}
                        className={`flex-1 py-3 rounded-lg font-semibold transition ${
                            currentTask.energyLevel === 1.5
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        Peak (150%)
                    </button>
                </div>
            </div>

            <button
                onClick={onAnalyze}
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-lg font-bold text-lg hover:from-purple-700 hover:to-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed glow-strong"
            >
                {loading ? (
                    <span className="flex items-center justify-center gap-3">
                        <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Analyzing with AI...
                    </span>
                ) : (
                    'Analyze Task with AI'
                )}
            </button>
        </div>
    );
}

// Risk Analysis Component
function RiskAnalysis({ riskAnalysis, subtasks, toggleSubtask, onReset }) {
    const completedCount = subtasks.filter(t => t.completed).length;
    const completionPercentage = Math.round((completedCount / subtasks.length) * 100);

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold gradient-text">Risk Analysis</h2>
                <button
                    onClick={onReset}
                    className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                >
                    New Task
                </button>
            </div>

            {/* Risk Meter */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-8 rounded-xl">
                <div className="flex flex-col md:flex-row items-center justify-around gap-8">
                    <div className="text-center">
                        <div className="relative inline-block">
                            <svg className="w-48 h-48 transform -rotate-90">
                                <circle
                                    cx="96"
                                    cy="96"
                                    r="80"
                                    stroke="#e5e7eb"
                                    strokeWidth="16"
                                    fill="none"
                                />
                                <circle
                                    cx="96"
                                    cy="96"
                                    r="80"
                                    stroke={riskAnalysis.riskColor}
                                    strokeWidth="16"
                                    fill="none"
                                    strokeDasharray={`${2 * Math.PI * 80 * riskAnalysis.probability / 100} ${2 * Math.PI * 80}`}
                                    className="transition-all duration-1000"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-5xl font-bold" style={{ color: riskAnalysis.riskColor }}>
                                        {riskAnalysis.probability}%
                                    </div>
                                    <div className="text-gray-600 font-semibold mt-1">
                                        Success Rate
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <span className={`px-6 py-2 rounded-full font-bold text-white ${
                                riskAnalysis.riskLevel === 'low' ? 'bg-green-500' :
                                riskAnalysis.riskLevel === 'medium' ? 'bg-yellow-500' :
                                'bg-red-500'
                            }`}>
                                {riskAnalysis.riskLevel.toUpperCase()} RISK
                            </span>
                        </div>
                    </div>

                    <div className="flex-1 space-y-4">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Metrics</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <MetricCard label="Total Hours" value={`${riskAnalysis.metrics.totalHours}h`} />
                            <MetricCard label="Available Hours" value={`${Math.round(riskAnalysis.metrics.availableHours)}h`} />
                            <MetricCard label="Days Remaining" value={riskAnalysis.metrics.daysRemaining} />
                            <MetricCard label="Hours/Day Needed" value={`${riskAnalysis.metrics.hoursPerDay}h`} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Recommendations */}
            <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                    <span>AI Recommendations</span>
                </h3>
                <ul className="space-y-2">
                    {riskAnalysis.recommendations.map((rec, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-blue-800">
                            <span className="text-blue-500 font-bold">â€¢</span>
                            <span>{rec}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Subtasks */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold text-gray-800">Subtasks</h3>
                    <div className="text-sm text-gray-600">
                        {completedCount} / {subtasks.length} completed ({completionPercentage}%)
                    </div>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
                    <div
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 h-3 rounded-full progress-bar"
                        style={{ width: `${completionPercentage}%` }}
                    />
                </div>

                <div className="space-y-3">
                    {subtasks.map((task, idx) => (
                        <div
                            key={idx}
                            onClick={() => toggleSubtask(idx)}
                            className={`p-4 rounded-lg border-2 cursor-pointer transition card-hover ${
                                task.completed
                                    ? 'bg-green-50 border-green-300'
                                    : 'bg-white border-purple-200 hover:border-purple-400'
                            }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                    task.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'
                                }`}>
                                    {task.completed && (
                                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className={`font-semibold ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                                        {task.name}
                                    </div>
                                    <div className="flex gap-4 mt-1 text-sm text-gray-600">
                                        <span>{task.hours}h</span>
                                        <span className={`px-2 py-0.5 rounded ${
                                            task.priority === 'high' ? 'bg-red-100 text-red-700' :
                                            task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-gray-100 text-gray-700'
                                        }`}>
                                            {task.priority}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// Daily Plan View Component
function DailyPlanView({ dailyPlan, riskAnalysis }) {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            const ctx = chartRef.current.getContext('2d');
            chartInstance.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: dailyPlan.map(day => new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
                    datasets: [{
                        label: 'Planned Hours',
                        data: dailyPlan.map(day => day.plannedHours),
                        backgroundColor: dailyPlan.map(day =>
                            day.riskLevel === 'high' ? 'rgba(239, 68, 68, 0.7)' :
                            day.riskLevel === 'medium' ? 'rgba(245, 158, 11, 0.7)' :
                            'rgba(16, 185, 129, 0.7)'
                        ),
                        borderColor: dailyPlan.map(day =>
                            day.riskLevel === 'high' ? 'rgb(239, 68, 68)' :
                            day.riskLevel === 'medium' ? 'rgb(245, 158, 11)' :
                            'rgb(16, 185, 129)'
                        ),
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Hours'
                            }
                        }
                    }
                }
            });
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [dailyPlan]);

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold gradient-text">Daily Execution Plan</h2>

            {/* Workload Chart */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Workload Distribution</h3>
                <div style={{ height: '300px' }}>
                    <canvas ref={chartRef}></canvas>
                </div>
            </div>

            {/* Daily Cards */}
            <div className="space-y-4">
                {dailyPlan.map((day, idx) => (
                    <DailyCard key={idx} day={day} dayNumber={idx + 1} />
                ))}
            </div>

            {/* Summary */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-3">Execution Summary</h3>
                <div className="grid md:grid-cols-3 gap-4 text-center">
                    <div>
                        <div className="text-3xl font-bold">{dailyPlan.length}</div>
                        <div className="text-purple-200">Days to Complete</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold">
                            {dailyPlan.reduce((sum, day) => sum + day.plannedHours, 0)}h
                        </div>
                        <div className="text-purple-200">Total Hours</div>
                    </div>
                    <div>
                        <div className="text-3xl font-bold">{riskAnalysis.probability}%</div>
                        <div className="text-purple-200">Success Probability</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Daily Card Component
function DailyCard({ day, dayNumber }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="bg-white border-2 border-purple-200 rounded-xl overflow-hidden card-hover">
            <div
                onClick={() => setExpanded(!expanded)}
                className="p-5 cursor-pointer flex items-center justify-between bg-gradient-to-r from-purple-50 to-indigo-50"
            >
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                        {dayNumber}
                    </div>
                    <div>
                        <div className="font-bold text-gray-800">
                            {new Date(day.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                        </div>
                        <div className="text-sm text-gray-600">
                            {day.plannedHours}h planned â€¢ {day.tasks.length} tasks â€¢ {day.utilization}% capacity
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        day.riskLevel === 'high' ? 'bg-red-100 text-red-700' :
                        day.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                    }`}>
                        {day.riskLevel.toUpperCase()}
                    </span>
                    <svg
                        className={`w-6 h-6 transition-transform ${expanded ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>

            {expanded && (
                <div className="p-5 space-y-3 bg-white">
                    {day.tasks.map((task, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-sm">
                                {idx + 1}
                            </div>
                            <div className="flex-1">
                                <div className="font-semibold text-gray-800">{task.name}</div>
                                <div className="text-sm text-gray-600">
                                    {task.allocatedHours}h
                                    {task.isPartial && <span className="text-orange-600 ml-2">(Partial)</span>}
                                </div>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                task.priority === 'high' ? 'bg-red-100 text-red-700' :
                                task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-gray-100 text-gray-700'
                            }`}>
                                {task.priority}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// Metric Card Component
function MetricCard({ label, value }) {
    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-purple-600">{value}</div>
            <div className="text-sm text-gray-600">{label}</div>
        </div>
    );
}

// Task History Component
function TaskHistory({ tasks, setTasks }) {
    const deleteTask = (id) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    return (
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold gradient-text mb-4">Task History</h2>
            <div className="space-y-3">
                {tasks.slice(-5).reverse().map(task => (
                    <div key={task.id} className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <div className="flex-1">
                            <div className="font-semibold text-gray-800">{task.name}</div>
                            <div className="text-sm text-gray-600">
                                Deadline: {new Date(task.deadline).toLocaleDateString()} â€¢
                                Risk: <span className={
                                    task.risk.riskLevel === 'low' ? 'text-green-600' :
                                    task.risk.riskLevel === 'medium' ? 'text-yellow-600' :
                                    'text-red-600'
                                }>{task.risk.probability}%</span>
                            </div>
                        </div>
                        <button
                            onClick={() => deleteTask(task.id)}
                            className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Render App
ReactDOM.render(<ExecuNovaApp />, document.getElementById('root'));
