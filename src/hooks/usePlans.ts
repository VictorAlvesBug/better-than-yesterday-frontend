import { useState, useEffect, useCallback } from 'react';
import { planApi } from '../services/api/planApi';
import type { Plan, CreatePlanData, UpdatePlanStatusData } from '../types/plan.types';
import { toast } from 'react-toastify';
export const usePlans = () => {
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fetchPlans = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await planApi.getAllPlans();
            setPlans(data);
        } catch (err) {
            const errorMessage = `Erro ao buscar planos: ${err instanceof Error ? err.message : 'Erro desconhecido'}`;
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);
    const getPlanById = useCallback(async (planId: string) => {
        setLoading(true);
        setError(null);
        try {
            const plan = await planApi.getPlanById(planId);
            return plan;
        } catch (err) {
            const errorMessage = `Erro ao buscar plano: ${err instanceof Error ? err.message : 'Erro desconhecido'}`;
            setError(errorMessage);
            toast.error(errorMessage);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);
    const createPlan = useCallback(async (planData: CreatePlanData) => {
        setLoading(true);
        setError(null);
        try {
            const newPlan = await planApi.createPlan(planData);
            if (newPlan) {
                setPlans((prev) => [...prev, newPlan]);
                toast.success('Plano criado com sucesso!');
                return newPlan;
            }
            return null;
        } catch (err) {
            const errorMessage = `Erro ao criar plano: ${err instanceof Error ? err.message : 'Erro desconhecido'}`;
            setError(errorMessage);
            toast.error(errorMessage);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);
    const updatePlanStatus = useCallback(
        async (updateData: UpdatePlanStatusData) => {
            setLoading(true);
            setError(null);
            try {
                const updatedPlan = await planApi.updatePlanStatus(updateData);
                if (updatedPlan) {
                    setPlans((prev) =>
                        prev.map((plan) =>
                            plan.planId === updatedPlan.planId ? updatedPlan : plan
                        )
                    );
                    toast.success('Status do plano atualizado!');
                    return updatedPlan;
                }
                return null;
            } catch (err) {
                const errorMessage = `Erro ao atualizar status do plano: ${err instanceof Error ? err.message : 'Erro desconhecido'}`;
                setError(errorMessage);
                toast.error(errorMessage);
                return null;
            } finally {
                setLoading(false);
            }
        },
        []
    );
    const cancelPlan = useCallback(async (planId: string) => {
        setLoading(true);
        setError(null);
        try {
            const success = await planApi.cancelPlan(planId);
            if (success) {
                setPlans((prev) => prev.filter((plan) => plan.planId !== planId));
                toast.success('Plano cancelado com sucesso!');
                return true;
            }
            return false;
        } catch (err) {
            const errorMessage = `Erro ao cancelar plano: ${err instanceof Error ? err.message : 'Erro desconhecido'}`;
            setError(errorMessage);
            toast.error(errorMessage);
            return false;
        } finally {
            setLoading(false);
        }
    }, []);
    useEffect(() => {
        fetchPlans();
    }, [fetchPlans]);
    return {
        plans,
        loading,
        error,
        fetchPlans,
        getPlanById,
        createPlan,
        updatePlanStatus,
        cancelPlan,
    };
};
